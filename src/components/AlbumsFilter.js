import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, FormGroup, FormControl, ControlLabel, Radio, Button } from 'react-bootstrap';
import '../styles/AlbumsFilter.css';
import { API_HOST } from '../config';

const GENRES_ENDPOINT = `${API_HOST}/genres.json`;

class AlbumsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: []
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

  genreChoice() {
    return this.genreSelect.value;
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
              />
            </FormGroup>

            <FormGroup className="col-md-1">
              <ControlLabel>Sort</ControlLabel>
              <Radio name="sortRadioGroup" className="RadioFirst" defaultChecked>Title</Radio>
              <Radio name="sortRadioGroup" className="RadioLast">Year</Radio>
            </FormGroup>

            <FormGroup className="col-md-1">
              <ControlLabel>Order</ControlLabel>
              <Radio name="orderRadioGroup" className="RadioFirst" defaultChecked>Forward</Radio>
              <Radio name="orderRadioGroup" className="RadioLast">Reverse</Radio>
            </FormGroup>

            <FormGroup className="col-md-1">
              <Button type="submit" bsStyle="success" bsSize="small" className="submit">Select</Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
    );
  }
}

export default AlbumsFilter;
