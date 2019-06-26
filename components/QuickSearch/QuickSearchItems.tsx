import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import players from "../../data/players";
import { importTeamLogos } from "../../helpers/image.helper";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";
import QuickSearchItem from "./QuickSearchItem";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../../static", false, /\.(svg)$/)
);

interface Props {
    onClick: (player: Player) => void;
}

interface State {
    players: Player[];
    quickSearchDisabled: boolean;
    isLoading: boolean;
}

export default class QuickSearchItems extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    constructor({ props, state }: { props: Props; state: State }) {
        super(props, state);
        this.state = {
            players: [],
            quickSearchDisabled: true,
            isLoading: true
        };
        this.getRandomPlayerList = this.getRandomPlayerList.bind(this);
        this.isQuickSearchDisabled = this.isQuickSearchDisabled.bind(this);
    }

    public componentDidMount() {
        this.setState({
            players: this.getRandomPlayerList(5)
        });

        this.setState({
            quickSearchDisabled: this.isQuickSearchDisabled()
        });

        this.setState({
            isLoading: false
        });
    }

    public getRandomPlayerList(length: number) {
        const result = new Array(length);
        let len = players.length;
        const taken = new Array(len);

        while (length--) {
            const x = Math.floor(Math.random() * len);
            result[length] = players[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }

        return result;
    }

    public isQuickSearchDisabled() {
        if (this.context.playersInfo.length >= 4) {
            return true;
        }
        return false;
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        let quickSearch;
        if (this.state.isLoading) {
            quickSearch = null;
        } else {
            quickSearch = this.state.players.map(player => (
                <QuickSearchItem
                    player={player}
                    quickSearchDisabled={this.state.quickSearchDisabled}
                    isLoading={this.state.isLoading}
                    onClick={() => {
                        this.props.onClick(player);
                    }}
                />
            ));
        }
        return quickSearch;
    }
}
