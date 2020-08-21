import React from 'react';
import { ListItem, Icon } from 'framework7-react';

import CompanyLogo from './CompanyLogo';
import './CompanyCard.less';

import formatNumber from '../utils/format-number';
import emojiFlag from '../utils/emoji-flag';

const CompanyCard = ({ company, skeleton }) => {
  return (
    <ListItem
      title={company.name}
      className={`company-card ${
        skeleton ? 'skeleton-text skeleton-effect-blink' : ''
      }`}
      link="/company/"
      routeProps={{ company }}
    >
      <div slot="media" className="company-card-position-logo">
        <span className="company-card-position">
          {formatNumber(company.position)}.
        </span>
        <CompanyLogo
          slot="media"
          name={company.name}
          url={
            company.logo || (!skeleton && `//logo.clearbit.com/${company.name}`)
          }
        />
      </div>
      <div slot="text" className="company-card-info">
        {company.country && (
          <span className="company-card-country">
            <span role="img" aria-label={company.country}>
              {emojiFlag(company.country)}
            </span>{' '}
            {company.country}
          </span>
        )}
      </div>

      <div slot="after" className="company-card-commits">
        <Icon f7="chevron_left_slash_chevron_right" size={16} />
        <span>{formatNumber(company.commits)}</span>
      </div>
    </ListItem>
  );
};

export default CompanyCard;
