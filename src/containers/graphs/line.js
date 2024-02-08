import React from 'react';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';

class Line extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    const node = this.ref.current;
    const {data, lineGenerator } = this.props;
      //alert(JSON.stringify(data));
    const initialData = data.map(d => ({
      name: d.createdAt,
      value: 0
    }));

    select(node)
      .append('path')
      .datum(initialData)
      .attr('id', 'line')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    // select(node)
    //   .selectAll('circle')
    //   .data(data)
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'circle')
    //   .attr('stroke', '#ECC417')
    //   .attr('stroke-width', '2')
    //   .attr('fill', '#333')
    //   .attr('r', 3)
    //   .attr('cx', (d, key) => xScale(key))
    //   .attr('cy', d => yScale(d.count));

    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const {
          data,
        } = this.props;

    const t = transition().duration(1000);

    const line = select('#line');
   // const dot = selectAll('.circle');
    // const upadateData = data.map(d => ({
    //     name: d.createdAt,
    //     value: d.total_count
    //   }))
 //alert(JSON.stringify(this.props.lineGenerator));
    line
      .datum(data)
      .transition(t)
      .attr('d', this.props.lineGenerator);

    // dot
    //   .data(data)
    //   .transition(t)
    //   .attr('cx', (d, key) => xScale(key))
    //   .attr('cy', d => yScale(d.count));
  }
  render() {
    return <g className="line-group" ref={this.ref} />;
  }
}

export default Line;
