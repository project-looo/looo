import React from 'react';
import { Icon, ListItem } from 'framework7-react';
import formatNumber from '../shared/format-number';

const RepoListItem = ({ repo, skeleton }) => {
  return (
    <ListItem
      key={repo.name}
      mediaItem
      title={repo.name}
      link={repo.url || `https://github.com/${repo.name}`}
      text={repo.description}
      external={!skeleton}
      target="_blank"
      className={skeleton ? 'skeleton-text skeleton-effect-blink' : ''}
    >
      {repo.stars && (
        <div slot="after">
          {!skeleton && <Icon f7="star_fill" size={16} />}

          <span>{formatNumber(repo.stars)}</span>
        </div>
      )}

      <div slot="after">
        {!skeleton && <Icon f7="chevron_left_slash_chevron_right" size={16} />}
        <span>{formatNumber(repo.commits)}</span>
      </div>
    </ListItem>
  );
};

export default RepoListItem;
