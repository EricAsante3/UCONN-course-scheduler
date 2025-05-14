import psycopg2
from database_files.serverside.connection_functions import connect_to_postgres

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


print(get_uncompleted_databases({'Fall 2025': '1258', 'Summer 2026': '1265', 'Summer 2025': '1255', 'Spring 2026': '1263'}))