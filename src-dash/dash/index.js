import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Plot from './graph/plot'
import Drop from './drop'

import './Dash.css'

const teams = [
    {
      "Team": "Atlanta Hawks",
      "Code": 1610612737
    },
    {
      "Team": "Boston Celtics",
      "Code": 1610612738
    },
    {
      "Team": "Brooklyn Nets",
      "Code": 1610612751
    },
    {
      "Team": "Charlotte Hornets",
      "Code": 1610612766
    },
    {
      "Team": "Chicago Bulls",
      "Code": 1610612741
    },
    {
      "Team": "Cleveland Cavaliers",
      "Code": 1610612739
    },
    {
      "Team": "Dallas Mavericks",
      "Code": 1610612742
    },
    {
      "Team": "Denver Nuggets",
      "Code": 1610612743
    },
    {
      "Team": "Detroit Pistons",
      "Code": 1610612765
    },
    {
      "Team": "Golden State Warriors",
      "Code": 1610612744
    },
    {
      "Team": "Houston Rockets",
      "Code": 1610612745
    },
    {
      "Team": "Indiana Pacers",
      "Code": 1610612754
    },
    {
      "Team": "Los Angeles Clippers",
      "Code": 1610612746
    },
    {
      "Team": "Los Angeles Lakers",
      "Code": 1610612747
    },
    {
      "Team": "Memphis Grizzlies",
      "Code": 1610612763
    },
    {
      "Team": "Miami Heat",
      "Code": 1610612748
    },
    {
      "Team": "Milwaukee Bucks",
      "Code": 1610612749
    },
    {
      "Team": "Minnesota Timberwolves",
      "Code": 1610612750
    },
    {
      "Team": "New Orleans Pelicans",
      "Code": 1610612740
    },
    {
      "Team": "New York Knicks",
      "Code": 1610612752
    },
    {
      "Team": "Oklahoma City Thunder",
      "Code": 1610612760
    },
    {
      "Team": "Orlando Magic",
      "Code": 1610612753
    },
    {
      "Team": "Philadelphia 76ers",
      "Code": 1610612755
    },
    {
      "Team": "Phoenix Suns",
      "Code": 1610612756
    },
    {
      "Team": "Portland Trail Blazers",
      "Code": 1610612757
    },
    {
      "Team": "Sacramento Kings",
      "Code": 1610612758
    },
    {
      "Team": "San Antonio Spurs",
      "Code": 1610612759
    },
    {
      "Team": "Toronto Raptors",
      "Code": 1610612761
    },
    {
      "Team": "Utah Jazz",
      "Code": 1610612762
    },
    {
      "Team": "Washington Wizards",
      "Code": 1610612764
    }
]

const boxStats = [
    {
        "Stat": "Minutes",
        "Identifier": "MIN",
        "Index": "9",
    },
    {
        "Stat": "Field Goals Made",
        "Identifier": "FGM",
        "Index": "10",
    },
    {
        "Stat": "Field Goals Attempted",
        "Identifier": "FGA",
        "Index": "11",
    },
    // {
    //     "Stat": "Field Goal Percentage",
    //     "Identifier": "FG_PCT",
    //     "Index": "12",
    // },
    {
        "Stat": "3 Pointers Made",
        "Identifier": "FG3M",
        "Index": "13",
    },
    {
        "Stat": "3 Pointers Attempted",
        "Identifier": "FG3A",
        "Index": "14",
    },
    // {
    //     "Stat": "3 Point Percentage",
    //     "Identifier": "FG3_PCT",
    //     "Index": "15",
    // },
    {
        "Stat": "Free Throws Made",
        "Identifier": "FTM",
        "Index": "16",
    },
    {
        "Stat": "Free Throws Attempted",
        "Identifier": "FTA",
        "Index": "17",
    },
    // {
    //     "Stat": "Free Throw Percentage",
    //     "Identifier": "FT_PCT",
    //     "Index": "18",
    // },
    {
        "Stat": "Offensive Rebounds",
        "Identifier": "OREB",
        "Index": "19",
    },
    {
        "Stat": "Defensive Rebounds",
        "Identifier": "DREB",
        "Index": "20",
    },
    {
        "Stat": "Rebounds",
        "Identifier": "REB",
        "Index": "21",
    },
    {
        "Stat": "Assists",
        "Identifier": "AST",
        "Index": "22",
    },
    {
        "Stat": "Steals",
        "Identifier": "STL",
        "Index": "23",
    },
    {
        "Stat": "Blocks",
        "Identifier": "BLK",
        "Index": "24",
    },
    {
        "Stat": "Turnovers",
        "Identifier": "TOV",
        "Index": "25",
    },
    {
        "Stat": "Fouls",
        "Identifier": "PF",
        "Index": "26",
    },
    {
        "Stat": "Points",
        "Identifier": "PTS",
        "Index": "27",
    },
    // {
    //     "Stat": "Plus Minus",
    //     "Identifier": "Plus_Minus",
    //     "Index": "28",
    // },
]


export default class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.changeTeam = this.changeTeam.bind(this)
        this.getPlayerStats = this.getPlayerStats.bind(this)
        this.showImg = this.showImg.bind(this)
        this.state = {
            team: '',
            players: [],
            selectedPlayer: '',
            selectedStat: "MIN",
            selectedStatIndex: 9,
            stats: [],
            loading: false,
            plotUpdating: false,
            modalDisp: false,
            imgModalDisp: false,
            canvasUrl: ''
        }
    }

    changeTeam(i) {
        // console.log("HEY")
        this.setState({ loading: true, plotUpdating: true, selectedPlayer: '', stats: [] })
        axios.get('https://9h0e0ghn8c.execute-api.us-east-1.amazonaws.com/prod/rosters/'+teams[i].Code)
            .then((result) =>{
                // console.log(result.data)
                this.setState({ team: teams[i].Team, players: result.data.roster, loading: false, plotUpdating: false })
            })
            .catch(error => console.log(error))
        // this.setState({team: teams[i]})
        // console.log("NOW HEY")
    }

    getPlayerStats(playername, playerid) {
        // console.log("WAZZUP")
        this.setState({ plotUpdating: true })
        axios.get('https://9h0e0ghn8c.execute-api.us-east-1.amazonaws.com/prod/boxscores/'+playerid)
            .then((result) =>{
                // console.log(result.data)
                var sorted = result.data.games
                sorted.sort(function(a,b){
                    return new Date(b.Game_Date) - new Date(a.Game_Date);
                })
                this.setState({ selectedPlayer: playername, stats: sorted, plotUpdating: false })
            })
            .catch(error => console.log(error))
    }
    
    showImg(canvasImgUrl) {
        this.setState({imgModalDisp: true, canvasUrl: canvasImgUrl})
    }

    render() {
        if (this.state.loading) {
            // console.log("LOADING")
            var list = <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><div className="lds-dual-ring"></div></div>
        } else if (this.state.players.length == 0) {
            var list = <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><h1 style={{ writingMode: "vertical-rl"}}>Waiting for Selection</h1></div>
        } else {
            var list =
            <ul className="list-group">
                {this.state.players.map((player, i) => <li className={(player.Player_Name == this.state.selectedPlayer) ? 'list-group-item active' : 'list-group-item'} onClick={(e)=>this.getPlayerStats(player.Player_Name, player.Player_ID, e)} key={i}>{player.Player_Name}</li>)}
            </ul>
        }

        if (this.state.plotUpdating) {
            var plot = <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><div className="lds-dual-ring"></div></div>
        } else if (this.state.players.length == 0) {
            var plot = <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "40px"}}>...</div>
        } else {
            var plot = <Plot data={this.state.stats} player={this.state.selectedPlayer} team={this.state.team} stat={this.state.selectedStat} showImg={this.showImg}/>
        }

        if (this.state.modalDisp) {
            var modal = <div id="myModal" className="modal" style={{display: "block", zIndex: "99999999"}}>
                <div className="modal-content"style={{ marginTop: "5%"}}>
                    <span className="close" onClick={() => this.setState({ modalDisp: !this.state.modalDisp})}>Close</span>
                    <h1>Welcome to Box Score Bandit!</h1>
                    <p>
                        Box Score Bandit is a tool from LucidBall that is designed to show trends in individual player statistics.
                        This is the beta version and only includes the most basic box score metrics, but if met with a positive response, more advanced analytics will be added.
                        To get started, select a team. When presented with the players on the roster, you may choose any of them and the stat you would like to track.
                        When the chart is generated, move your mouse across the screen to see individual game performances, as well as the rolling average.
                        If you would like to use the chart, click on it and a download window will appear. Feel free to tweet any chart or use it in your articles.
                        We greatly appreciate when you attribute your usage to LucidBall as it helps us reach more people.
                        Lastly, if you have recommendations, please send an email to <a href='mailto:lucidballviz@gmail.com'>lucidballviz@gmail.com</a> or tweet at <a href='https://twitter.com/lucidball'>@LucidBall</a>, and if you would like to donate, click on the <a href='https://www.paypal.me/lucidball'>PayPal link</a> below!
                    </p>
                </div>
            </div>
        } else {
            var modal = <div style={{ display: "none"}}></div>
        }
        if (this.state.imgModalDisp) {
            var imgModal = <div id="myModal" className="modal" style={{display: "block", zIndex: "99999999"}}>
                <div className="modal-content" style={{ marginTop: "5%"}}>
                    <span className="close" onClick={() => this.setState({ imgModalDisp: !this.state.imgModalDisp})}>Close</span>
                    <div style={{textAlign: "center"}}><img src={this.state.canvasUrl} alt='LucidBallGraph' style={{width: "80%"}}/></div>
                    <div style={{ textAlign: "center", display: "inline-block"}}>
                        <button type="button" className="btn btn-dark" style={{width: "10%", margin: "10px 10px 10px 10px"}} onClick={() => {
                            var url = this.state.canvasUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream')
                            var link = document.createElement("a");
		                    link.download = this.state.selectedPlayer+'-'+this.state.selectedStat+'.png';
		                    link.href = url;
		                    document.body.appendChild(link);
		                    link.click();
                        }}>Download</button>
                        <button type="button" className="btn btn-light" style={{width: "10%", margin: "10px 10px 10px 10px"}} onClick={() => this.setState({ imgModalDisp: !this.state.imgModalDisp})}>Cancel</button>
                    </div>
                </div>
            </div>
        } else {
            var imgModal = <div style={{ display: "none"}}></div>
        }

        return(
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "12%", zIndex: "9999", position: "relative", borderBottom: "1px solid black"}}>
                    <Drop callback={this.changeTeam} />
                    <label onClick={() => this.setState({ modalDisp: !this.state.modalDisp})} className="btn" style={{right: "10px", position: "absolute", backgroundColor: "rgba(0,0,0,0)", fontSize: "6vh", outline: "0"}}>?</label>
                </div>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "4%", zIndex: "999", boxShadow: "1px 1px 1px 4px rgba(0, 0, 0, 0.8)", whiteSpace: "nowrap", flexWrap: "nowrap", position: "relative",  overflowX: "scroll"}}>
                    {boxStats.map((stat, i) => <div className="col-xs-4 stat-mi" style={{ paddingLeft: "1vw", paddingRight: "1vw", cursor: "pointer", backgroundColor: (stat.Index == this.state.selectedStatIndex ? "#DCDCDC" : "") }} key={i} onClick={() => this.setState({selectedStat: stat.Identifier, selectedStatIndex: stat.Index})}>{stat.Stat}</div>)}
                </div>
                <div className="row" style={{ zIndex: "999", height: "78%" }}>
                    <div className="col-2" style={{padding: "0 0 0 0", height: "99%", overflow: "scroll", borderRight: "3px solid black"}}>
                        {list}
                    </div>
                    <div className="col-10" style={{height: "97%", backgroundColor: "white"}}>
                        {plot}
                    </div>
                </div>
                <div className="row" style={{ zIndex: "9999", height: "6%", backgroundColor: "#FFFAFA", boxShadow: "0px 0px 10px rgba(0 , 0 , 0, 0.8)" }}>
                    <a className="btn" href="https://twitter.com/lucidball" data-url="https://dev.twitter.com/web/tweet-button"><i className="fab fa-twitter"></i></a>
                    <a className="btn" href="https://www.paypal.me/lucidball" style={{color: "#003087"}}><i className="fab fa-paypal"></i></a>
                    <a className="btn" href="https://github.com/HashedDan/lucidball" style={{color: "black"}}><i className="fab fa-github"></i></a>
                    <h3 style={{ position: "absolute", right: "10px", fontFamily: "Permanent Marker", color: "red", fontSize: "4vh", cursor: "pointer"}}><a href="https://lucidball.com" style={{textDecoration: "none", color: "red"}} >LucidBall</a></h3>
                </div>
                {modal}
                {imgModal}
            </div>
        );
    }
}