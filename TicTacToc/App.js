import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  // punto de partida de la App

  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1 // first player
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    });
  };

  // Capturar al Ganador
  getWinner = () => {
    const NUM_TILES = 3;
    var matriz = this.state.gameState;
    var suma;

    // comprobando Fila ganadora
    for (var i = 0; i < NUM_TILES; i++) {
      suma = matriz[i][0] + matriz[i][1] + matriz[i][2];
      if (suma == 3) {
        return 1;
      } else if (suma == -3) {
        return -1;
      }
    }

    // comprobando columna ganadora
    for (var i = 0; i < NUM_TILES; i++) {
      suma = matriz[0][i] + matriz[1][i] + matriz[2][i];
      if (suma == 3) {
        return 1;
      } else if (suma == -3) {
        return -1;
      }
    }

    // comprobando diagonal ganadora
    suma = matriz[0][0] + matriz[1][1] + matriz[2][2];
    if (suma == 3) {
      return 1;
    } else if (suma == -3) {
      return -1;
    }

    suma = matriz[2][0] + matriz[1][1] + matriz[0][2];
    if (suma == 3) {
      return 1;
    } else if (suma == -3) {
      return -1;
    }

    // comprobando cuando No existe ganador
    return 0;
  };

  onTilePress = (row, col) => {
    // No permite reescribir una ficha ya marcada
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    // captura jugador actual
    var currentPlayer = this.state.currentPlayer;

    // establecer posición de la ficha
    var matriz = this.state.gameState.slice(); // devuelve una copia nueva
    matriz[row][col] = currentPlayer;
    this.setState({ gameState: matriz });

    // Siguiente jugador
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // Comprobar al Ganador
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Jugador LUNA es el Ganador');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Jugador ESTRELLA es el Ganador');
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return (
          <Image source={require('./src/img/luna.png')} style={styles.tileX} />
        );
      case -1:
        return (
          <Image
            source={require('./src/img/estrella.png')}
            style={styles.tileO}
          />
        );
      default:
        return <View />;
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('./src/img/fondo.jpg')}
        style={styles.container}
      >
        <Text style={styles.textStyle}>Tic-Tac-Toe</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.buton} />
        <Button
          color="#00ced1"
          title="Nuevo Juego"
          onPress={this.onNewGamePress}
        />
      </ImageBackground> //
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textStyle: {
    fontSize: 30,
    paddingBottom: 50,
    fontFamily: 'serif',
    color: '#00ced1'
  },

  imgStyle: {
    width: 100,
    height: 100,
    marginTop: 30
  },

  tile: {
    borderWidth: 7,
    borderColor: '#f5fffa',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tileX: {
    flex: 1,
    width: 80,
    height: 50
  },

  tileO: {
    flex: 1,
    width: 80,
    height: 50
  },

  buton: {
    paddingTop: 50
  }
});
