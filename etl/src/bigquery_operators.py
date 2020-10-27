import biggerquery as bgq


class RunQueryAndSaveToNewTable:
    """
    USes biggergquery to run a bigquery query and store the result in another bigquery table.
    """

    def __init__(self,
                 sql,
                 create_table_sql,
                 gh_archive_table,
                 project,
                 dataset,
                 dest_table,
                 dataset_location="US",
                 gh_archive_dataset="month",
                 ):

        self.sql = sql
        self.create_table_sql = create_table_sql
        self.gh_archive_table = gh_archive_table
        self.project = project
        self.dataset = dataset
        self.dest_table = dest_table
        self.dataset_location = dataset_location
        self.gh_archive_dataset = gh_archive_dataset

    def execute_dry_run(self):

        dataset = bgq.Dataset(
            project_id=self.project,
            dataset_name=self.dataset,
            location=self.dataset_location
        )

        if self.sql.endswith(".sql"):
            with open(self.sql, mode="r", encoding="utf-8") as f:
                query = f.read()
        else:
            query = self.sql
        if self.gh_archive_dataset is None:
            query = query
        else:
            query = query.format(self.gh_archive_dataset, self.gh_archive_table)

        dry_select = dataset.dry_run(query)
        res = dry_select.run()

        return res

    def execute(self):

        dataset = bgq.Dataset(
            project_id=self.project,
            dataset_name=self.dataset,
            location=self.dataset_location
        )

        if self.create_table_sql.endswith(".sql"):
            with open(self.create_table_sql, mode="r", encoding="utf-8") as f:
                create_query = f.read()
        else:
            create_query = self.create_table_sql

        if self.sql.endswith(".sql"):
            with open(self.sql, mode="r", encoding="utf-8") as f:
                query = f.read()
        else:
            query = self.sql

        query = query.format(self.gh_archive_dataset, self.gh_archive_table)

        create_query = create_query.format(dest_table=self.dest_table)

        dataset.create_table(create_query).run()
        if self.gh_archive_dataset is None:
            write_email_domain_count = dataset.write_truncate(self.dest_table,
                                                              query,
                                                              partitioned=False)
        else:
            write_email_domain_count = dataset.write_truncate(self.dest_table,
                                                              query.format(self.gh_archive_dataset,
                                                                           self.gh_archive_table),
                                                              partitioned=False)

        write_email_domain_count.run()

        return "New table created"
