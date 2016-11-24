/* eslint react/prop-types: 0 */

import React from 'react';

import {
  InstantSearch,
  ClearAll,
  CurrentRefinements,
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InfiniteHits,
  Menu,
  MultiRange,
  Pagination,
  PoweredBy,
  RangeInput,
  RangeRatings,
  RefinementList,
  SearchBox,
  SortBy,
  Stats,
  Toggle,
} from 'react-instantsearch/dom';

import {
  connectClearAll,
  connectCurrentRefinements,
  connectHierarchicalMenu,
  connectHits,
  connectHitsPerPage,
  connectInfiniteHits,
  connectMenu,
  connectMultiRange,
  connectPagination,
  connectPoweredBy,
  connectRefinementList,
  connectSearchBox,
  connectSortBy,
  connectStats,
  connectToggle,
} from 'react-instantsearch/connectors';

const NoRender = () => null;
const AutoSelectMenu = connectMenu(NoRender);
const AutoSelectRefinementList = connectRefinementList(NoRender);
const AutoSelectHierarchicalMenu = connectHierarchicalMenu(NoRender);

const Variation = props =>
<InstantSearch
  appId="latency"
  apiKey="6be0576ff61c053d5f9a3225e2a90f76"
  indexName="ikea"
>
  <div>
    {props.children}
  </div>
</InstantSearch>;

const App = () =>
  <InstantSearch
    appId="latency"
    apiKey="6be0576ff61c053d5f9a3225e2a90f76"
    indexName="ikea"
  >
    <div>
      <Facets/>
      <Results/>
    </div>
  </InstantSearch>;

const Facets = () =>
<div className="facets">
  <h1>Filters</h1>
  <hr/>

  <h2>ClearAll enabled</h2>
  <Variation>
    <AutoSelectMenu attributeName="type" defaultRefinement="Mirror" />
    <ClearAll />
  </Variation>
  <hr/>

  <h2>ClearAll disabled</h2>
  <Variation>
    <ClearAll />
  </Variation>
  <hr/>

  <h2>CurrentRefinements no refinements</h2>
  <Variation>
    <CurrentRefinements/>
  </Variation>
  <hr/>

  <h2>CurrentRefinements with refinements</h2>
  <Variation>
    <AutoSelectMenu attributeName="type" defaultRefinement="Mirror" />
    <CurrentRefinements/>
  </Variation>
  <hr/>

  <h2>HierarchicalMenu nothing selected</h2>
  <Variation>
    <HierarchicalMenu
      attributes={[
        'category',
        'sub_category',
        'sub_sub_category',
      ]}
    />
  </Variation>
  <hr/>

  <h2>HierarchicalMenu first level selected</h2>
  <Variation>
    <HierarchicalMenu
      attributes={[
        'category',
        'sub_category',
        'sub_sub_category',
      ]}
      defaultRefinement="Bathroom"
    />
  </Variation>
  <hr/>

  <h2>HitPerPage</h2>
  <HitsPerPage
    defaultRefinement={5}
    items={[{
      value: 5,
    }, {
      value: 10,
    }, {
      value: 20,
    }]}
  />
  <hr/>

  <h2>Menu</h2>
  <Menu
    attributeName="type"
  />
  <hr/>

  <h2>MultiRange</h2>
  <MultiRange
    attributeName="price"
    items={[
      {end: 10, label: '<$10'},
      {start: 10, end: 100, label: '$10-$100'},
      {start: 100, end: 500, label: '$100-$500'},
      {start: 500, label: '>$500'},
    ]}
  />
  <hr/>

  <h2>Pagination</h2>
  <Pagination />
  <hr/>

  <h2>PoweredBy</h2>
  <PoweredBy />
  <hr/>

  <h2>RangeInput</h2>
  <RangeInput
    attributeName="price"
  />
  <hr/>

  <h2>RangeRatings</h2>
  <RangeRatings
    attributeName="rating"
  />
  <hr/>

  <h2>RefinementList</h2>
  <RefinementList
    attributeName="materials"
  />
  <hr/>

  <h2>SearchBox</h2>
  <SearchBox />
  <hr/>

  <h2>SortBy</h2>
  <SortBy
    defaultRefinement="ikea"
    items={[
      {value: 'ikea', label: 'Featured'},
      {value: 'ikea_price_asc', label: 'Price asc.'},
      {value: 'ikea_price_desc', label: 'Price desc.'},
    ]}
  />
  <hr/>

  <h2>Stats</h2>
  <Stats />
  <hr/>

</div>;

const Results = () =>
<div className="hits">
  <h2>Hits</h2>
  <Hits/>
  <hr/>

  <h2>InfiniteHits</h2>
  <InfiniteHits/>
  <hr/>
</div>;

export default App;
