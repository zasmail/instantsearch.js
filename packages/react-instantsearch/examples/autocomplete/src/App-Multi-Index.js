import React, {Component} from 'react';
import {InstantSearch, Highlight} from 'react-instantsearch/dom';
import {createConnector} from 'react-instantsearch';
import {connectSearchBox} from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';
import {isEqual, forOwn} from 'lodash';
/* eslint-disable import/no-unresolved */
import 'react-instantsearch-theme-algolia/style.css';
/* eslint-enable import/no-unresolved */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchState: {}, hits: {}, query: ''};
  }

  onSearchStateChange(searchState) {
    this.setState({searchState: {...this.state.searchState, ...searchState}});
  }

  onProps(props) {
    this.setState({hits: {...this.state.hits, [props.indexName]: props.hits}, query: props.query});
  }

  formatHitsForAutoSuggest() {
    const hits = [];
    forOwn(this.state.hits, (value, key) => {
      hits.push({title: key, hits: value});
    });
    return hits;
  }

  render() {
    return (
      <div>
        <FirstResults onProps={this.onProps.bind(this)}
                      searchState={this.state.searchState}
                      onSearchStateChange={this.onSearchStateChange.bind(this)}/>
        <SecondResults onProps={this.onProps.bind(this)} searchState={this.state.searchState}
                       onSearchStateChange={this.onSearchStateChange.bind(this)}/>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="bestbuy"
        >
          <Autosuggest
            suggestions={this.formatHitsForAutoSuggest()}
            multiSection={true}
            onSuggestionsFetchRequested={({value}) => this.onSearchStateChange({query: value})}
            onSuggestionsClearRequested={() => this.onSearchStateChange({query: ''})}
            getSuggestionValue={hit => hit.name}
            renderSuggestion={hit => {
              let description = '';
              if (hit._highlightResult.description) {
                description = <Highlight attributeName="description" hit={hit}/>;
              } else if (hit._highlightResult.shortDescription) {
                description = <Highlight attributeName="shortDescription" hit={hit}/>;
              }
              return (
                <div style={{display: 'flex'}}>
                  <div style={{maginRight: 5}}>
                    <img alt="product" width="50px" height="50px" src={`${hit.image}`}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: 5}}><Highlight attributeName="name" hit={hit}/></div>
                    <div style={{marginBottom: 5}}>{description}</div>
                  </div>
                </div>
              );
            }}
            inputProps={{
              placeholder: 'Type a product',
              value: this.state.query,
              onChange: () => {
              },
            }}
            renderSectionTitle={section => section.title}
            getSectionSuggestions={section => section.hits}
          />
        </InstantSearch>
      </div>
    );
  }
}

class FirstResults extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.searchState, nextProps.searchState);
  }

  render() {
    return <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="bestbuy"
      searchState={this.props.searchState}
      onSearchStateChange={this.props.onSearchStateChange}
      searchParameters={{hitsPerPage: 3}}
    >
      <div>
        <VirtualSearchBox/>
        <VirtualAutoSuggest indexName="bestbuy" onProps={this.props.onProps}/>
      </div>
    </InstantSearch>;
  }
}

FirstResults.propTypes = {
  searchState: React.PropTypes.object.isRequired,
  onSearchStateChange: React.PropTypes.func.isRequired,
  onProps: React.PropTypes.func.isRequired,
};

class SecondResults extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.searchState, nextProps.searchState);
  }

  render() {
    return <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="ikea"
      searchState={this.props.searchState}
      onSearchStateChange={this.props.onSearchStateChange}
      searchParameters={{hitsPerPage: 3}}
    >
      <div>
        <VirtualSearchBox/>
        <VirtualAutoSuggest onProps={this.props.onProps} indexName="ikea"/>
      </div>
    </InstantSearch>;
  }
}

SecondResults.propTypes = {
  searchState: React.PropTypes.object.isRequired,
  onSearchStateChange: React.PropTypes.func.isRequired,
  onProps: React.PropTypes.func.isRequired,
};

const VirtualSearchBox = connectSearchBox(() => null);

const connectAutoComplete = createConnector({
  displayName: 'AutoComplete',

  getProvidedProps(props, state, search) {
    const hits = search.results ? search.results.hits : [];
    return {
      hits, query: state.query !== undefined ? state.query : '',
    };
  },
});

class AutoComplete extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.props.onProps(nextProps);
  }

  render() {
    return null;
  }
}

AutoComplete.propTypes = {
  onProps: React.PropTypes.func.isRequired,
};

const VirtualAutoSuggest = connectAutoComplete(AutoComplete);

export default App;

