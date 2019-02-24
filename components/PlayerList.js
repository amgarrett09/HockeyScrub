import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const teams = [

  { name: 'Anaheim Ducks', id: 0 },
  { name: 'Arizona Coyotes', id: 1 },
  { name: 'Boston Bruins', id: 2 },
  { name: 'Buffalo Sabres', id: 3 },
  { name: 'Calgary Flames', id: 4 },
  { name: 'Carolina Hurricanes', id: 5 },
  { name: 'Chicago Blackhawks', id: 6 },
  { name: 'Colorado Avalanche', id: 7 },
  { name: 'Columbus Blue Jackets', id: 8 },
  { name: 'Dallas Stars', id: 9 },
  { name: 'Detroit Red Wings', id: 10 },
  { name: 'Edmonton Oilers', id: 11 },
  { name: 'Florida Panthers', id: 12 },
  { name: 'Los Angeles Kings', id: 13 },
  { name: 'Minnesota Wild', id: 14 },
  { name: 'Montréal Canadiens', id: 15 },
  { name: 'Nashville Predators', id: 16 },
  { name: 'New Jersey Devils', id: 17 },
  { name: 'New York Islanders', id: 18 },
  { name: 'New York Rangers', id: 19 },
  { name: 'Ottawa Senators', id: 20 },
  { name: 'Philadelphia Flyers', id: 21 },
  { name: 'Pittsburgh Penguins', id: 22 },
  { name: 'San Jose Sharks', id: 23 },
  { name: 'St. Louis Blues', id: 24 },
  { name: 'Tampa Bay Lightning', id: 25 },
  { name: 'Toronto Maple Leafs', id: 26 },
  { name: 'Vancouver Canucks', id: 27 },
  { name: 'Vegas Golden Knights', id: 28 },
  { name: 'Washington Capitals', id: 29 },
  { name: 'Winnipeg Jets', id: 30 },

];

class PlayerList extends React.Component { // eslint-disable-line no-undef
  state = {
    players: [],
  };

  showPlayers = async (e) => {
    const teamName = e.target.value;

    try {
      // Fetch teams from NHL api
      const res = await fetch(
        'https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster',
      );
      const json = await res.json();

      // Get the correct team
      const [team] = json.teams.filter(obj => obj.name === teamName);

      // Get player names and ids from Roster
      const players = team.roster.roster.map(obj => ({
        name: obj.person.fullName,
        id: obj.person.id,
      }));

      this.setState({
        players,
      });
    } catch {
      this.setState({
        players: [],
      });
    }
  }

  render() {
    const { players } = this.state;

    return (
      <section>
        <h1>Find active players</h1>
        <select onChange={this.showPlayers}>
          <option value="">Select a team</option>
          {teams.map(team => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        {players.map(player => (
          <span key={player.id}>
            <br />
            <Link href={`/player?id=${player.id}`}>
              <a>{player.name}</a>
            </Link>
          </span>
        ))}
      </section>

    );
  }
}

export default PlayerList;