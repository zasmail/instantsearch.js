import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {
  Toggle, CurrentFilters, HierarchicalMenu,
  Hits, HitsPerPage, Menu, MultiRange, Pagination, PoweredBy, RangeRatings, RangeInput,
  RefinementList, SearchBox, SortBy, Stats, Reset
} from '../packages/react-instantsearch/dom';
import {Wrap} from './util';
import Slider from './3rdPartiesIntegration.stories';

const stories = storiesOf('Default Style', module);

stories.add('default with select and Range', () =>
  <Wrap>
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <SearchBox/>
        <PoweredBy />
      </div>
      <div style={{display: 'flex'}}>
        <div style={{padding: '0px 20px'}}>
          <p>Hierarchical Menu</p>
          <HierarchicalMenu
            id="categories"
            attributes={[
              'category',
              'sub_category',
              'sub_sub_category',
            ]}
          />
          <p>Menu</p>
          <Menu attributeName="type"/>
          <p>Refinement List</p>
          <RefinementList attributeName="colors"/>
          <p>Toggle</p>
          <Toggle attributeName="materials"
                  label="Made with solid pine"
                  value={'Solid pine'}
          />
          <p>Range</p>
          <Slider id="slider" attributeName="price"/>
          <p>Range Ratings</p>
          <RangeRatings attributeName="rating" max={6}/>

        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <HitsPerPage currentRefinement={10} items={[{value: 10}, {value: 20}, {value: 30}, {value: 50}]}/>
            <SortBy
              items={[
                {value: 'ikea', label: 'Featured'},
                {value: 'ikea_price_asc', label: 'Price asc.'},
                {value: 'ikea_price_desc', label: 'Price desc.'},
              ]}
              defaultRefinement="ikea"
            />
            <Stats />
            <CurrentFilters />
            <Reset/>
          </div>
          <div>
            <Hits />
          </div>
          <div style={{alignSelf: 'center'}}>
            <Pagination showLast={true}/>
          </div>
        </div>
      </div>
    </div>
  </Wrap>
).add('default with links and multi range', () =>
  <Wrap>
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <SearchBox/>
        <PoweredBy />
      </div>
      <div style={{display: 'flex'}}>
        <div style={{padding: '0px 20px'}}>
          <p>Hierarchical Menu</p>
          <HierarchicalMenu
            id="categories"
            attributes={[
              'category',
              'sub_category',
              'sub_sub_category',
            ]}
          />
          <p>Menu</p>
          <Menu attributeName="type"/>
          <p>Refinement List</p>
          <RefinementList attributeName="colors"/>
          <p>Toggle</p>
          <Toggle attributeName="materials"
                  label="Made with solid pine"
                  value={'Solid pine'}
          />
          <p>MultiRange</p>
          <MultiRange attributeName="price"
                      id="multirange"
                      items={[
                        {end: 10, label: '<$10'},
                        {start: 10, end: 100, label: '$10-$100'},
                        {start: 100, end: 500, label: '$100-$500'},
                        {start: 500, label: '>$500'},
                      ]}
          />
          <p>Range Rating</p>
          <RangeRatings attributeName="rating" max={6}/>

        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <HitsPerPage currentRefinement={10} items={[{value: 10}, {value: 20}, {value: 30}, {value: 50}]}/>
            <SortBy
              items={[
                {value: 'ikea', label: 'Featured'},
                {value: 'ikea_price_asc', label: 'Price asc.'},
                {value: 'ikea_price_desc', label: 'Price desc.'},
              ]}
              defaultRefinement="ikea"
            />
            <Stats />
            <CurrentFilters />
            <Reset/>
          </div>
          <div>
            <Hits />
          </div>
          <div style={{alignSelf: 'center'}}>
            <Pagination showLast={true}/>
          </div>
        </div>
      </div>
    </div>
  </Wrap>
).add('default with range input', () =>
  <Wrap>
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <SearchBox/>
        <PoweredBy />
      </div>
      <div style={{display: 'flex'}}>
        <div style={{padding: '0px 20px'}}>
          <p>Hierarchical Menu</p>
          <HierarchicalMenu
            id="categories"
            attributes={[
              'category',
              'sub_category',
              'sub_sub_category',
            ]}
          />
          <p>Menu</p>
          <Menu attributeName="type"/>
          <p>Refinement List</p>
          <RefinementList attributeName="colors"/>
          <p>Toggle</p>
          <Toggle attributeName="materials"
                  label="Made with solid pine"
                  value={'Solid pine'}
          />
          <p>Range Input</p>
          <RangeInput id="input" attributeName="price"/>
          <p>Range Rating</p>
          <RangeRatings attributeName="rating" max={6}/>

        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <HitsPerPage currentRefinement={10} items={[{value: 10}, {value: 20}, {value: 30}, {value: 50}]}/>
            <SortBy
              items={[
                {value: 'ikea', label: 'Featured'},
                {value: 'ikea_price_asc', label: 'Price asc.'},
                {value: 'ikea_price_desc', label: 'Price desc.'},
              ]}
              defaultRefinement="ikea"
            />
            <Stats />
            <CurrentFilters />
            <Reset/>
          </div>
          <div>
            <Hits />
          </div>
          <div style={{alignSelf: 'center'}}>
            <Pagination showLast={true}/>
          </div>
        </div>
      </div>
    </div>
  </Wrap>
);
