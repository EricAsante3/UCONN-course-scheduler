import psycopg2

def connect_to_postgres(dbname, user, password, host="localhost", port="5432"):
    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("Connection successful")
        return conn
    except Exception as e:
        print("Connection failed:", e)
        return None