import React from 'react'
import CanvasApp from 'react-responsive-canvas';
 
class CanvasApp extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
 
  draw() {
    // Draw whatever
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
 
  render () {
    return (
      <div>
        <Canvas
          canvasRef={el => (this.canvas = el)}
          handleResize={this.draw} />
      </div>
    );
  }
}


export default CanvasApp;