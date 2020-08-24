import React from 'react';
import { ListItem, Icon } from 'framework7-react';

import CompanyLogo from './CompanyLogo';
import './CompanyListItem.less';

import formatNumber from '../shared/format-number';
import emojiFlag from '../shared/emoji-flag';

const CompanyListItem = ({ company, skeleton }) => {
  let positionClass = 'company-list-item-position';
  if (company.position > 10000)
    positionClass += ' company-list-item-position-xs';
  else if (company.position > 1000)
    positionClass += ' company-list-item-position-sm';
  return (
    <ListItem
      title={company.name}
      className={`company-list-item ${
        skeleton ? 'skeleton-text skeleton-effect-blink' : ''
      }`}
      link="/company/"
      routeProps={{ company }}
    >
      <div slot="media" className="company-list-item-position-logo">
        <span className={positionClass}>{formatNumber(company.position)}</span>
        <CompanyLogo
          slot="media"
          name={company.name}
          url={
            company.logo || (!skeleton && `//logo.clearbit.com/${company.name}`)
          }
        />
      </div>
      <div slot="text" className="company-list-item-info">
        {company.country && (
          <span className="company-list-item-country">
            <span role="img" aria-label={company.country}>
              {emojiFlag(company.country)}
            </span>{' '}
            {company.country}
          </span>
        )}
      </div>

      <div slot="after" className="company-list-item-commits">
        <Icon f7="chevron_left_slash_chevron_right" size={16} />
        <span>{formatNumber(company.commits)}</span>
      </div>
    </ListItem>
  );
};

export default CompanyListItem;
