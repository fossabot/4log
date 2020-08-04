import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PageList from '@molecule/list/Page';

const StaticAllPageList = () => (
  <StaticQuery
    query={graphql`
      {
        allSitePage(filter: { componentPath: { regex: "/src/views/pages/" } }) {
          edges {
            node {
              id
              componentPath
            }
          }
        }
      }
    `}
    render={(data) => {
      return <PageList data={data} />;
    }}
  />
);

export default StaticAllPageList;
