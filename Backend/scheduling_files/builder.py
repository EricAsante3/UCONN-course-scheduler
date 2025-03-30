import json
from functools import lru_cache
from concurrent.futures import ProcessPoolExecutor
import time
import hashlib
from itertools import product
from scheduling_files.class_combiner import combination_maker

# Try to use faster JSON parser if available
try:
    import orjson as json
except ImportError:
    import json

# ======================
# 1. CACHE OPTIMIZATIONS
# ======================

class MeetingTimeCache:
    """Optimized cache for meeting times using memory-efficient storage"""
    __slots__ = ['data']
    
    def __init__(self):
        self.data = {}
    
    def get(self, key):
        return self.data.get(hashlib.md5(key.encode()).hexdigest())
    
    def set(self, key, value):
        self.data[hashlib.md5(key.encode()).hexdigest()] = value

meeting_time_cache = MeetingTimeCache()

# ======================
# 2. CORE UTILITIES
# ======================

@lru_cache(maxsize=100000)
def convert_to_minutes(time_str):
    """Ultra-fast time conversion with common-case optimization"""
    if not time_str or not isinstance(time_str, str):
        return 0
    
    # Handle empty or invalid times
    if len(time_str) < 3 or not time_str.isdigit():
        return 0
    
    # Optimized path for 4-digit times (most common case)
    if len(time_str) == 4:
        return int(time_str[:2]) * 60 + int(time_str[2:])
    
    # Handle 3-digit times (like 930 for 9:30 AM)
    if len(time_str) == 3:
        return int(time_str[0]) * 60 + int(time_str[1:])
    
    return 0

def preprocess_meeting_time(mt_str):
    """Optimized meeting time parser with direct JSON handling"""
    if not mt_str or not isinstance(mt_str, str):
        return []
    
    try:
        # Fast path for properly formatted JSON
        if mt_str.startswith('['):
            return json.loads(mt_str)
        
        # Handle single meeting case
        if mt_str.startswith('{'):
            return [json.loads(mt_str)]
        
        # Fallback for malformed JSON
        cleaned = mt_str.replace('\\"', '"').strip()
        if cleaned.startswith('['):
            return json.loads(cleaned)
        if cleaned.startswith('{'):
            return [json.loads(cleaned)]
        
        return []
    except:
        return []

# ======================
# 3. OVERLAP DETECTION
# ======================

def time_slots_overlap(args):
    """
    Optimized overlap detection using:
    - Bitmask day representation
    - Precomputed time ranges
    - Minimal memory allocation
    """
    a_data, b_data, conflictions = args
    DAY_BITMASK = {'M': 1, 'T': 2, 'W': 4, 'R': 8, 'F': 16, 'S': 32, 'U': 64}
    
    # Fast exit for non-physical meetings
    if a_data[1] in {'Online Instruction', 'Does Not Meet', 'by arrangement'} or \
       b_data[1] in {'Online Instruction', 'Does Not Meet', 'by arrangement'}:
        return False

    # Get or compute meeting times
    slot1 = meeting_time_cache.get(a_data[0]) or preprocess_meeting_time(a_data[0])
    slot2 = meeting_time_cache.get(b_data[0]) or preprocess_meeting_time(b_data[0])
    
    if not slot1 or not slot2:
        return False

    # Process slots into efficient comparison format
    def process_slot(slot):
        days = 0
        time_ranges = []
        for meeting in slot:
            if not isinstance(meeting, dict):
                continue
                
            # Convert days to bitmask
            day_str = meeting.get('meet_day', '')
            for day in day_str:
                days |= DAY_BITMASK.get(day.upper(), 0)
            
            # Convert times
            start = convert_to_minutes(meeting.get('start_time', ''))
            end = convert_to_minutes(meeting.get('end_time', ''))
            
            if start < end:  # Only add valid time ranges
                time_ranges.append((start, end))
        
        return days, time_ranges

    days1, ranges1 = process_slot(slot1)
    days2, ranges2 = process_slot(slot2)
    
    # Quick exit if no overlapping days
    if not (days1 & days2):
        return False

    # Check all time range combinations
    for (s1, e1), (s2, e2) in product(ranges1, ranges2):
        if not (e1 <= s2 or e2 <= s1):
            # Store conflict with minimal memory usage
            conflictions.add(f"{a_data[0]}|{b_data[0]}")
            return True
    
    return False

# ======================
# 4. COMBINATION VALIDATION
# ======================

def is_valid_combination(args):
    """Optimized validation for process pool"""
    components, conflictions = args
    
    # Pre-extract meeting data
    meeting_data = [
        (comp['meetingTimes'], comp['meets'])
        for comp in components
        if isinstance(comp, dict)
    ]
    
    # Check all unique pairs
    n = len(meeting_data)
    for i in range(n):
        for j in range(i + 1, n):
            if time_slots_overlap((meeting_data[i], meeting_data[j], conflictions)):
                return False
    return True

# ======================
# 5. SCHEDULE GENERATION
# ======================

def generate_valid_permutations(data):
    """Massively parallel schedule generator"""
    try:
        all_combinations = combination_maker(data)
        valid_schedules = {}
        conflictions = set()
        
        # Determine optimal chunk size
        num_combinations = len(all_combinations)
        chunk_size = max(1, num_combinations // (8 * 4))  # Adjust based on CPU cores
        
        with ProcessPoolExecutor() as executor:
            # Prepare tasks with minimal data copying
            tasks = []
            for key, combination in all_combinations.items():
                flat_components = [
                    comp
                    for comp_group in combination
                    for comp in comp_group
                ]
                tasks.append((flat_components, conflictions, key))
            
            # Process in optimized chunks
            results = []
            for i in range(0, len(tasks), chunk_size):
                chunk = tasks[i:i + chunk_size]
                results.extend(executor.map(is_valid_combination, chunk))
            
            # Collect valid schedules
            for (_, _, key), is_valid in zip(tasks, results):
                if is_valid:
                    valid_schedules[key] = all_combinations[key]
        
        return valid_schedules
    
    except Exception as e:
        print(f"Error in generate_valid_permutations: {str(e)}")
        return {}

# ======================
# 6. MAIN ENTRY POINT
# ======================

def schedule_maker(data):
    """Ultra-optimized schedule generation endpoint"""
    start_time = time.time()
    
    try:
        # Phase 1: Pre-cache all meeting times
        if isinstance(data, dict) and 'courses' in data:
            for course in data['courses']:
                if isinstance(course, dict):
                    mt_str = course.get('meetingTimes', '[]')
                    if mt_str not in meeting_time_cache.data:
                        meeting_time_cache.set(mt_str, preprocess_meeting_time(mt_str))
        
        # Phase 2: Generate valid schedules
        result = generate_valid_permutations(data)
        
        # Phase 3: Post-processing
        print(f"Schedule generated in {time.time() - start_time:.2f} seconds")
        return {
            'schedules': result,
            'generation_time': time.time() - start_time,
            'conflict_count': len(meeting_time_cache.data)
        }
    
    except Exception as e:
        print(f"Critical error in schedule_maker: {str(e)}")
        return {'error': str(e)}

# ======================
# 7. SUPPORT FUNCTIONS
# ======================

def validate_course_data(course):
    """Ensure course data has required fields"""
    return (
        isinstance(course, dict) and
        isinstance(course.get('meetingTimes'), str) and
        isinstance(course.get('meets'), str) and
        isinstance(course.get('crn'), str)
    )

def clean_input_data(data):
    """Pre-process input data for consistency"""
    if not isinstance(data, dict):
        return {'courses': []}
    
    if 'courses' not in data:
        return {'courses': []}
    
    return {
        'courses': [
            course for course in data['courses']
            if validate_course_data(course)
        ]
    }