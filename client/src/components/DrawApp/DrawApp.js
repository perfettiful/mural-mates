import React from 'react'

const styles = {
  canvas: {
<<<<<<< HEAD
    border: '2px solid #333',
=======
    border: '2px solid #333'
    // height:'auto',
    // width:'100%'
>>>>>>> 18c3dedc32c015fd8454c5c202e3ddb1562449a7
  },

  maindiv: {
    margin: 'auto',
    width: '100%'
  },

  button: {
    border: '0px',
    margin: '2px',
    height: '30px',
    minWidth: '30px'
  },

  colorOptions: {
    red: { 'backgroundColor': 'red' },
    orange: { 'backgroundColor': 'orange' },
    yellow: { 'backgroundColor': 'yellow' },
    green: { 'backgroundColor': 'green' },
    blue: { 'backgroundColor': 'blue' },
    purple: { 'backgroundColor': 'purple' },
    black: { 'backgroundColor': 'black' }
  }
}

export default class DrawApp extends React.Component {


  componentDidMount() {
    this.reset();
    this.refs.canvas.addEventListener('touchmove', function (e) { e.preventDefault(); })
  }

  // What to do if pen is either up or down
  penUp(e) {

    let threshold = 5;
    let xLocation = this.state.penCoords.x
    let yLocation = this.state.penCoords.y
    let isMouseUp = e.nativeEvent.type === "mouseup"
    if (this.state.pen === "down"
      && (!this.state.ignoreMouse || !isMouseUp)
      && (Math.abs(xLocation - this.state.drawStart.x) < threshold
        && Math.abs(yLocation - this.state.drawStart.y) < threshold)) {
      this.dot(xLocation, yLocation)
    }
    this.setState({
      pen: 'up',
      ignoreMouse: !isMouseUp
    })
  }

  dot(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000000';
    this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  penDown(e) {
    const rect = this.refs.canvas.getBoundingClientRect();
    let coords = {
      x: e.nativeEvent.offsetX || e.nativeEvent.touches[0].clientX - rect.left,
      y: e.nativeEvent.offsetY || e.nativeEvent.touches[0].clientY - rect.top
    }
    this.setState({
      pen: 'down',
      drawStart: coords,
      penCoords: coords,
      ignoreMouse: this.state.ignoreMouse || e.nativeEvent.type === "touchstart"
    })
  }

  // Function used to set pen color
  setColor(c) {
    //a color button was clicked
    this.setState({
      penColor: c
    })
  }

  // Handling buttons being clicked 
  // Setting mode to draw, when draw button is clicked
  draw(e) {
    this.setState({
      mode: 'draw'
    })
  }

  // Setting mode to erase, when erase button is clicked
  erase() {
    this.setState({
      mode: 'erase'
    })
  }

  // Reset button to clear canvas back to white and resets states back to originals
  reset() {
    this.setState({
      mode: 'draw',
      pen: 'up',
      lineWidth: 5,
      penColor: 'black'
    })

    this.ctx = this.refs.canvas.getContext('2d')
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, 350, 350)
    this.ctx.lineWidth = 5
  }

  // Increasing pen size when button is pressed
  penSizeUp(e) {
    this.setState({
      lineWidth: this.state.lineWidth + 5
    })
  }
  // Decreasing pen size when button is pressed
  penSizeDown(e) {
    this.setState({
      lineWidth: this.state.lineWidth - 5
    })
  }

  // Function to determine what to do while pen is down
  drawing(e) {

    if (this.state.pen === 'down') {
      const rect = this.refs.canvas.getBoundingClientRect();
      let newCoords = {
        x: e.nativeEvent.offsetX || e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.offsetY || e.nativeEvent.touches[0].clientY - rect.top
      }
      this.ctx.beginPath()
      this.ctx.lineWidth = this.state.lineWidth
      this.ctx.lineCap = 'round';

      if (this.state.mode === 'draw') {
        this.ctx.strokeStyle = this.state.penColor
      }

      if (this.state.mode === 'erase') {
        this.ctx.strokeStyle = '#fff'
      }

      // Move to old position
      this.ctx.moveTo(this.state.penCoords.x, this.state.penCoords.y)

      // Draw line to new position
      this.ctx.lineTo(newCoords.x, newCoords.y)
      this.ctx.stroke();

      // Getting new position
      this.setState({
        penCoords: newCoords
      })
    }
  }

  render() {
    return (
      <div style={styles.maindiv}>

        <canvas id='canvas' ref='canvas' width='350px' height='350px' style={styles.canvas}
          onMouseMove={(e) => this.drawing(e)}
          onMouseDown={(e) => this.penDown(e)}
          onMouseUp={(e) => this.penUp(e)}
          onTouchStart={(e) => this.penDown(e)}
          onTouchMove={(e) => this.drawing(e)}
          onTouchEnd={(e) => this.penUp(e)}>
        </canvas>

        <div>
          <button className="tiny ui button" onClick={(e) => this.draw(e)} style={styles.button}>Draw </button>
          <button className="tiny ui button" onClick={(e) => this.erase(e)} style={styles.button}>Erase</button>
          <button className="tiny ui button" onClick={(e) => this.penSizeUp()} style={styles.button}>Pen Size +</button>
          <button className="tiny ui button" onClick={(e) => this.penSizeDown()} style={styles.button}>Pen Size -</button>
          <button className="tiny ui button" onClick={() => this.reset()} style={styles.button}>Reset</button>
        </div>

        <div>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.red, styles.button)} onClick={() => this.setColor('red')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.orange, styles.button)} onClick={() => this.setColor('orange')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.yellow, styles.button)} onClick={() => this.setColor('yellow')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.green, styles.button)} onClick={() => this.setColor('green')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.blue, styles.button)} onClick={() => this.setColor('blue')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.purple, styles.button)} onClick={() => this.setColor('purple')}></button>
          <button className="ui avatar image" style={Object.assign({}, styles.colorOptions.black, styles.button)} onClick={() => this.setColor('black')}></button>
        </div>

      </div>
    )
  }
}