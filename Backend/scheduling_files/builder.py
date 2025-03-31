from itertools import product
import json
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor
import time
from scheduling_files.class_combiner import combination_maker
# Global cache for meeting times to avoid repeated parsing
meeting_time_cache = {}

def remove_escape_chars(input_str):
    """Optimized escape character removal"""
    if '\\"' in input_str:
        return input_str.replace('\\"', '"')
    return input_str

@lru_cache(maxsize=None)
def convert_to_minutes(time_str):
    """Cached time conversion with error handling"""
    if not time_str or time_str == "None":
        return (0, (0, 0))
    
    if len(time_str) == 3:
        time_str = "0" + time_str
    
    try:
        hours = int(time_str[:2])
        minutes = int(time_str[2:])
        return (hours * 60 + minutes, (hours, minutes))
    except (ValueError, IndexError):
        return (0, (0, 0))

def safe_json_parse(json_str):
    """Robust JSON parsing with multiple fallbacks"""
    if not json_str or not isinstance(json_str, str):
        return []
    
    try:
        # First try direct parse
        return json.loads(json_str)
    except json.JSONDecodeError:
        try:
            # Try with cleaned escape chars
            cleaned = remove_escape_chars(json_str)
            return json.loads(cleaned)
        except json.JSONDecodeError:
            try:
                # Try wrapping in brackets if it looks like a list
                if not (json_str.startswith('[') and json_str.endswith(']')):
                    return json.loads(f'[{json_str}]')
            except json.JSONDecodeError:
                pass
    return []

def time_slots_overlap(a, b, conflictions):
    """
    Optimized overlap checking with robust error handling
    """
    try:
        ps1, ps2 = a[1], b[1]
        
        # Skip non-physical meetings
        non_physical = {"Online Instruction", "Does Not Meet", "by arrangement"}
        if ps1 in non_physical or ps2 in non_physical:
            return False

        # Create cache keys
        mt1_key = (str(a[0]), str(a[1]))
        mt2_key = (str(b[0]), str(b[1]))

        # Get or create cached meeting times
        if mt1_key not in meeting_time_cache:
            meeting_time_cache[mt1_key] = safe_json_parse(a[0])
        slot1 = meeting_time_cache[mt1_key]

        if mt2_key not in meeting_time_cache:
            meeting_time_cache[mt2_key] = safe_json_parse(b[0])
        slot2 = meeting_time_cache[mt2_key]

        # Validate parsed data
        if not isinstance(slot1, list) or not isinstance(slot2, list):
            return False

        # Preprocess slots
        def preprocess(slots):
            processed = []
            for slot in slots:
                if not isinstance(slot, dict):
                    continue
                try:
                    slot = slot.copy()
                    slot["start_min"] = convert_to_minutes(slot.get("start_time", ""))[0]
                    slot["end_min"] = convert_to_minutes(slot.get("end_time", ""))[0]
                    processed.append(slot)
                except (KeyError, AttributeError):
                    continue
            return processed

        slot1 = preprocess(slot1)
        slot2 = preprocess(slot2)

        # Group by day
        def group_by_day(slots):
            groups = {}
            for slot in slots:
                day = slot.get("meet_day")
                if day:
                    groups.setdefault(day, []).append(slot)
            return groups

        group1 = group_by_day(slot1)
        group2 = group_by_day(slot2)

        # Check for overlaps
        for day in group1:
            if day in group2:
                for s1 in group1[day]:
                    for s2 in group2[day]:
                        if not (s1["end_min"] <= s2["start_min"] or s2["end_min"] <= s1["start_min"]):
                            conflict_pair = tuple(sorted((str(s1), str(s2))))
                            conflictions.add(conflict_pair)
                            return True
        return False

    except Exception as e:
        print(f"Error in time_slots_overlap: {str(e)}")
        return False

def is_valid_combination(components):
    """Validate combination of course components"""
    try:
        conflict = set()
        n = len(components)
        
        # Prepare component data
        prepared = []
        for comp in components:
            mt = comp.get("meetingTimes", "[]")
            meets = comp.get("meets", "")
            crn = comp.get("crn", "")
            prepared.append((mt, meets, crn))

        # Check all pairs
        with ThreadPoolExecutor() as executor:
            futures = []
            for i in range(n):
                for j in range(i + 1, n):
                    futures.append(executor.submit(
                        time_slots_overlap,
                        (prepared[i][0], prepared[i][1]),
                        (prepared[j][0], prepared[j][1]),
                        conflict
                    ))
            
            for future in futures:
                if future.result():  # If any overlap found
                    return False
        
        return True
    
    except Exception as e:
        print(f"Error in is_valid_combination: {str(e)}")
        return False

def generate_valid_permutations(data):
    """Generate all valid schedule permutations"""
    try:
        all_combinations = combination_maker(data)
        new_dict = {key: [] for key in all_combinations.keys()}
        
        # Process combinations in parallel
        with ThreadPoolExecutor() as executor:
            future_to_key = {}
            for key, combination in all_combinations.items():
                components = [comp for component in combination for comp in component]
                future = executor.submit(is_valid_combination, components)
                future_to_key[future] = (key, combination)
            
            for future in future_to_key:
                key, combination = future_to_key[future]
                if future.result():
                    crns = [comp["crn"] for component in combination for comp in component]
                    new_dict[key].append(combination)
        
        return {k: v for k, v in new_dict.items() if v}
    
    except Exception as e:
        print(f"Error in generate_valid_permutations: {str(e)}")
        return {}

def schedule_maker(data):
    """Main entry point for schedule generation"""
    start_time = time.time()
    try:
        result = generate_valid_permutations(data)
        print(f"Schedule generation completed in {time.time() - start_time:.2f} seconds")
        return result
    except Exception as e:
        print(f"Error in schedule_maker: {str(e)}")
        return {}