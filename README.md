# Project LOOO (List Of Opensource Organizations)
We have created a list of the top 100K open source organizations.
It is Inspired by EPAM’s Open Source Company Index but there are some differences: 
- It includes all kind of organizations not just companies
- The list contains the top 100K organizations
- Based on number of commits not number of contributors.
# The method we used
## How did we measure the contribution?
When we measured the contribution we only considered the commits on GitHub. There are many other ways to contribute to a project not just commits but in this particular case we wanted to focus on the commits.
## How can we know which company contributed to a repository?
When you check a git history you can see each commit has an author. This has two parts: name and email. The second part of the email is usually the company’s domain. We know in some cases a contributor might use a different email address which doesn’t contain the company email address.
## How to assign a commit to a company?
There are around 2.4B public commits in GitHub (since 2011) and we have to analyze each and every one of them to answer this question. 
Using the GitHub API to extract that amount of data would be impossible. Thanks to the GitHub Archive Project, all the public GitHub events are stored in a publicly available [BigQuery](https://cloud.google.com/blog/products/gcp/github-on-bigquery-analyze-all-the-open-source-code) database. Using SQL to extract data makes the process much easier. 
## Clean up the data
After we counted the commits for each company. The data needs to be cleaned. We excluded email providers like gmail, hotmail, yandex etc. And there are some cases when commits were made by a bot, we also excluded them.
## Implementation
You can find the code in the [etl](https://github.com/codersrank-org/project-looc/tree/master/etl) (Export, Transform, Load) directory.

# Roadmap
- Add ETL source code
- Automate ETL
- Add the block list of domains to the repo and make it part of the ETL
- Add user block list and make it part of the ETL
- Add Organization description. In case, if an organization needs detailed description, change logo or name. 
# How to contribute?
TODO
