/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Popup, View, Page, Navbar, Link, Icon, Block } from 'framework7-react';

const About = () => {
  return (
    <Popup class="about about-popup" closeOnEscape push>
      <View>
        <Page className="about-page">
          <Navbar title="About" transparent>
            <Link slot="right" popupClose>
              <Icon ios="f7:xmark" md="material:close" size={24} />
            </Link>
          </Navbar>
          <Block>
            <h1 className="page-title">About</h1>
          </Block>
          <Block>
            <h3>How did we measure the contribution?</h3>
            <p>
              When we measured the contribution we only considered the commits.
              We know there are many other ways to contribute to a project not
              just commits but in this particular case we wanted to focus on the
              commits.
            </p>
            <h3>How can we know which company contributed to a repository?</h3>
            <p>
              We relied on the email address of the authors. The second part of
              the email is usually the company’s domain.
            </p>
            <h3>How to assign a commit to a company?</h3>
            {/* prettier-ignore */}
            <p>
              There are around 2.4B public commits in GitHub (since 2011) and we
              have to analyze each and every one of them to answer this
              question. Using the GitHub API to extract that amount of data
              would be impossible. Thanks to the GitHub Archive Project, all the
              public GitHub events are stored in a publicly available <a
                href="https://cloud.google.com/blog/products/gcp/github-on-bigquery-analyze-all-the-open-source-code"
                className="external"
                target="_blank"
                rel="noreferrer"
              >
                BigQuery
              </a> database. Using SQL to extract data makes the process much easier.
            </p>
            <h3>Clean up the data</h3>
            <p>
              After we counted the commits for each company. The data needs to
              be cleaned. We excluded email providers like gmail, hotmail,
              yandex etc. And there are some cases when commits were made by a
              bot, we also excluded them.
            </p>
            <h3>Implementation</h3>
            <p>
              You can find the code in the{' '}
              <a
                href="https://github.com/codersrank-org/project-looc/tree/master/etl"
                className="external"
                target="_blank"
                rel="noreferrer"
              >
                etl
              </a>{' '}
              (Export, Transform, Load) directory.
            </p>
            <h3>Roadmap</h3>
            <ul>
              <li>Add ETL source code</li>
              <li>Automate ETL</li>
              <li>
                Add the block list of domains to the repo and make it part of
                the ETL
              </li>
              <li>Add user block list and make it part of the ETL</li>
              <li>
                Add Organization description. In case, if an organization needs
                detailed description, change logo or name.{' '}
              </li>
            </ul>
          </Block>
        </Page>
      </View>
    </Popup>
  );
};

export default About;
