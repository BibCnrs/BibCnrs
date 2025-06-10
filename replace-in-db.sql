DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE (column_name = 'content_fr' OR column_name = 'content_en')
            AND table_schema = 'public'
    LOOP
        EXECUTE format('UPDATE %I SET %I = REPLACE(%I, %L, %L)',
            r.table_name, r.column_name, r.column_name, '{{ARG1}}', '{{ARG2}}');
    END LOOP;
END
$$;