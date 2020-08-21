import React, { useState } from 'react';
import stringToColor from '../shared/string-to-color';

import './CompanyLogo.less';

const CompanyLogo = ({ name, url }) => {
  const [errored, setErrored] = useState(false);
  const color = stringToColor(name);
  return (
    <div className="company-logo">
      {!errored && url && url.length ? (
        <img
          src={url}
          alt={name}
          title={name}
          onError={() => setErrored(true)}
        />
      ) : (
        <svg
          title={name}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <rect width="32" height="32" fill={color} rx="4" />
          <text
            v-if="name"
            x="50%"
            y="50%"
            fontWeight="bold"
            fontSize="20"
            fill="#fff"
            dy="0"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {name[0].toUpperCase()}
          </text>
        </svg>
      )}
    </div>
  );
};

export default CompanyLogo;
