import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, FormGroup, FormControl, ControlLabel, Radio, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../styles/AlbumsFilter.css';
import { API_HOST } from '../config';

const GENRES_ENDPOINT = `${API_HOST}/genres.json`;

class AlbumsFilter extends Component {
  constructor(props) {
    super(props);

    // The value of the radio controls.
    this.sort = 'title';
    this.order = 'forward';

    this.state = {
      genres: [],
      selectButtonText: 'Select'
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios.get(GENRES_ENDPOINT)
      .then(response => {
        this.setState({
          genres: response.data.genres,
        });
      });
  }

  genreValue() {
    return this.genreSelect.value;
  }

  yearValue() {
    return this.yearInput.value;
  }

  sortValue() {
    return this.sort;
  }

  orderValue() {
    return this.order;
  }

  handleSortTitle = () => {
    this.sort = 'title';
  }

  handleSortYear = () => {
    this.sort = 'year';
  }

  handleOrderForward = () => {
    this.order = 'forward';
  }

  handleOrderReverse = () => {
    this.order = 'reverse';
  }

  selecting() {
    this.setState({
      selectButtonText:
      <div>
        <FontAwesome name="spinner" spin pulse /> Selecting
      </div>
    });
  }

  selected() {
    this.setState({ selectButtonText: 'Select' });
  }

  renderGenreOptions() {
    return (
      this.state.genres.map(genre =>
        <option key={genre.id} value={genre.name}>{genre.name}</option>
      )
    );
  }

  render() {
    return (
      <Row className="AlbumsFilter">
        <Col md={12}>
          <form onSubmit={this.props.onFilterSubmit}>
            <FormGroup className="col-md-2 col-md-offset-2">
              <ControlLabel>Genre</ControlLabel>
              <FormControl
                componentClass="select"
                bsSize="sm"
                inputRef={(select) => this.genreSelect = select}
              >
                <option value="Choose">Choose</option>
                {this.renderGenreOptions()}
              </FormControl>
            </FormGroup>

            <FormGroup className="col-md-2">
              <ControlLabel>Year(s)</ControlLabel>
              <FormControl
                type="text"
                bsSize="sm"
                placeholder="2000, 2004..2008"
                name="years"
                pattern="[0-9., ]+"
                inputRef={(input) => this.yearInput = input}
              />
            </FormGroup>

            <FormGroup className="col-md-1">
              <ControlLabel>Sort</ControlLabel>
              <Radio
                name="sortRadioGroup"
                className="RadioFirst"
                defaultChecked
                onChange={this.handleSortTitle}
              >
                Title
              </Radio>
              <Radio
                name="sortRadioGroup"
                className="RadioLast"
                onChange={this.handleSortYear}
              >
                Year
              </Radio>
            </FormGroup>

            <FormGroup className="col-md-1">
              <ControlLabel>Order</ControlLabel>
              <Radio
                name="orderRadioGroup"
                className="RadioFirst"
                defaultChecked
                onChange={this.handleOrderForward}
              >
                Forward
              </Radio>
              <Radio
                name="orderRadioGroup"
                className="RadioLast"
                onChange={this.handleOrderReverse}
              >
                Reverse
              </Radio>
            </FormGroup>

            <FormGroup className="col-md-1">
              <Button
                type="submit"
                bsStyle="success"
                bsSize="small"
                className="submit"
              >
                {this.state.selectButtonText}
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
    );
  }
}

export default AlbumsFilter;
