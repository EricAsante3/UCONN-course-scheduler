import re
from datetime import datetime

from bs4 import BeautifulSoup
from bs4 import XMLParsedAsHTMLWarning
import warnings
warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)



def extract_semesters_and_subjects_from_html_stage_1(html):
    soup = BeautifulSoup(html, "html.parser")

    def select_to_swapped_dict(select_id):
        select = soup.find("select", {"id": select_id})
        return {
            option.text.strip(): option["value"]
            for option in select.find_all("option")
            if option.get("value", "").strip()
        }

    semesters = select_to_swapped_dict("UC_DERIVED_GST_STRM1")
    subjects = select_to_swapped_dict("UC_DERIVED_GST_SUBJECT")
    del subjects['All']
    return semesters, subjects

def extract_semesters_from_html_stage_2(html):
    # Find all CDATA blocks
    cdata_blocks = re.findall(r"<!\[CDATA\[(.*?)\]\]>", html, re.DOTALL)

    for block in cdata_blocks:
        soup = BeautifulSoup(block, "html.parser")
        select = soup.find("select", {"id": "UC_DERIVED_GST_STRM"})
        if select:
            semesters = {
                option.get_text(strip=True): option["value"]
                for option in select.find_all("option")
                if option.get("value")
            }
            return semesters

    print("Could not find <select id='UC_DERIVED_GST_STRM'>")
    return {}






def parse_meeting_times(meeting_times):
    def to_24h_int(time_str):
        return int(datetime.strptime(time_str.strip(), "%I:%M%p").strftime("%H%M"))

    # Split each segment by '&'
    parts = meeting_times.split('&')
    schedule = {}

    for part in parts:
        # Extract time range
        time_match = re.search(r'(\d{1,2}:\d{2}[APMapm]{2})\s*-\s*(\d{1,2}:\d{2}[APMapm]{2})', part)
        if not time_match:
            continue

        start = to_24h_int(time_match.group(1))
        end = to_24h_int(time_match.group(2))

        # Extract days (e.g. MoWeFr, or just Fr)
        days_match = re.search(r'/\s*([A-Za-z]{2,6})', part)
        if not days_match:
            continue

        days = re.findall(r'Mo|Tu|We|Th|Fr|Sa|Su', days_match.group(1))
        for day in days:
            if day not in schedule:
                schedule[day] = set()
            schedule[day].add((start, end))

    # Convert sets back to sorted lists
    return {day: sorted(list(times)) for day, times in schedule.items()}

