import psycopg2
from database_files.serverside_functions.connection_functions import connect_to_postgres
import json

def get_uncompleted_databases(fetched_semesters):
    conn = connect_to_postgres(dbname="postgres", user="postgres", password="123")
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("SELECT datname FROM pg_database WHERE datistemplate = false;")
    databases_in_server = [row[0] for row in cur.fetchall() if row[0] != 'postgres']
    cur.close()
    conn.close()
    
    for db in databases_in_server:
        try:
            conn = connect_to_postgres(dbname=db, user="postgres", password="123")
            cur = conn.cursor()

            cur.execute("""
            SELECT COUNT(*) 
            FROM information_schema.schemata
            WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public');
            """)
            count = cur.fetchone()[0]
            print(f"{db} non-system table count: {count}")

            if count > 1:
                print(f"Removing {db} from fetched_semesters")
                fetched_semesters.pop(db, None)

        except Exception as e:
            print(f"Skipping {db} due to error: {e}")

        finally:
            if cur: cur.close()
            if conn: conn.close()

    return fetched_semesters




def insert_main_component(sec_num, subject, course_code, class_type, meeting_times, crn, instruction_method, campus, title, credit_amount, professor):
    try:
        conn = connect_to_postgres(dbname="Fall 2025", user="postgres", password="123")
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO main_sections (
                main_section_number, class_subject, class_code,
                class_type, meeting_time, crn,
                instruction_method, campus, title, credits
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            sec_num, subject, course_code,
            class_type, json.dumps(meeting_times), crn,
            instruction_method, campus, title, credit_amount
        ))
        
        cur.execute("""
            INSERT INTO professors (instructor)
            VALUES (%s)
            ON CONFLICT DO NOTHING;
        """, (
            professor,
        ))

        cur.execute("""
            INSERT INTO teaches (instructor,main_section_number,class_subject,class_code)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            professor, sec_num, subject, course_code
        ))       
        conn.commit()

        print("Insert successful.")
    
    except Exception as e:
        print("Error inserting:", e)
    
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()