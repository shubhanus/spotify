import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import actions from "../../../actions";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount = async () => {
    // requirements are not clear so going ahead with best UX i can think of
    // In case if client wants to fetch all in one shot then show data
    // then we can use promise.all that will send parallel req
    await this.getDiscoverDataAndSetState(
      "newReleases",
      actions.getNewReleases
    );
    await this.getDiscoverDataAndSetState(
      "playlists",
      actions.getFeaturedPlaylists
    );
    await this.getDiscoverDataAndSetState("categories", actions.getCategories);
  };

  getDiscoverDataAndSetState = (stateType, api, time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        api().then((data) => {
          this.setState(
            {
              [stateType]: data,
            },
            resolve
          );
        });
      }, time);
    });
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
