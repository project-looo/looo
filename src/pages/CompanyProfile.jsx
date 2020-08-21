import React, { useState, useEffect } from 'react';
import {
  Popup,
  View,
  Page,
  Navbar,
  Link,
  Icon,
  Block,
  List,
  ListItem,
  Button,
  Col,
  Row,
  BlockTitle,
} from 'framework7-react';
import CompanyLogo from '../components/CompanyLogo';
import RepoListItem from '../components/RepoListItem';

import formatNumber from '../utils/format-number';
import emojiFlag from '../utils/emoji-flag';
import { getCompanyDetails } from '../utils/api';
import { mockRepo } from '../utils/mocks';

import './CompanyProfile.less';

const CompanyProfile = ({ company }) => {
  const [repos, setRepos] = useState(null);
  const [reposErrored, setReposErrored] = useState(false);
  useEffect(() => {
    getCompanyDetails(company.id)
      .then((reposData) => {
        setRepos(reposData.repos);
      })
      .catch(() => {
        setReposErrored(true);
      });
  }, []);
  return (
    <Popup class="company-profile company-profile-popup" closeOnEscape push>
      <View>
        <Page className="company-profile-page">
          <Navbar title={company.name} transparent>
            <Link slot="right" popupClose>
              <Icon ios="f7:xmark" md="material:close" size={24} />
            </Link>
          </Navbar>
          <Block className="company-profile-header">
            <CompanyLogo
              name={company.name}
              url={company.logo || `//logo.clearbit.com/${company.name}`}
            />
            <div className="company-profile-header-content">
              <h1 className="page-title">{company.name}</h1>
              <Row className="company-profile-buttons">
                <Col width={50}>
                  <Button
                    href={company.website || `http://${company.name}`}
                    target="_blank"
                    external
                  >
                    <Icon f7="arrow_up_right_square" size={20} />
                    <span>Website</span>
                  </Button>
                </Col>
                {company.github && (
                  <Col width={50}>
                    <Button href={company.github} target="_blank" external>
                      <Icon f7="logo_github" size={20} />
                      <span>GitHub Profile</span>
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          </Block>

          <List inset className="company-profile-details-list">
            <ListItem
              header="Position in leaderboard"
              title={`${company.position}.`}
            >
              <Icon f7="graph_circle_fill" size={24} slot="media" />
            </ListItem>
            <ListItem
              header="Number of commits"
              title={formatNumber(company.commits)}
            >
              <Icon
                f7="chevron_left_slash_chevron_right"
                size={24}
                slot="media"
              />
            </ListItem>
            {company.country && (
              <ListItem header="Country">
                <Icon f7="globe" slot="media" />
                <span
                  className="company-profile-country"
                  size={24}
                  slot="title"
                >
                  <span role="img" aria-label={company.country}>
                    {emojiFlag(company.country)}
                  </span>{' '}
                  {company.country}
                </span>
              </ListItem>
            )}
          </List>
          {repos === null && !reposErrored && (
            <>
              <BlockTitle medium>Most active repositories</BlockTitle>
              <List inset mediaList className="company-profile-repos-list">
                <ul>
                  {Array.from({ length: 10 }).map((r, index) => (
                    <RepoListItem repo={mockRepo} skeleton key={index} />
                  ))}
                </ul>
              </List>
            </>
          )}
          {repos && repos.length > 0 && (
            <>
              <BlockTitle medium>Most active repositories</BlockTitle>
              <List inset mediaList className="company-profile-repos-list">
                <ul>
                  {repos.map((repo) => (
                    <RepoListItem repo={repo} key={repo.name} />
                  ))}
                </ul>
              </List>
            </>
          )}
        </Page>
      </View>
    </Popup>
  );
};
export default CompanyProfile;
