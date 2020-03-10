import * as d3 from "d3";
import React from "react";

export interface BarChartModel {
    name: string;
    value: number;
}

interface IBarChartProps {
    data: Array<BarChartModel>;
    xAxisLabel: string,
    yAxisLabel: string,
    svgHeight: number;
    ticks?: number;
    innerPadding?: number;
}


class BarChart extends React.PureComponent<IBarChartProps, any> {
    containerRef: any;
    isRendered = false;
    svg: any;

    constructor(props: any) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
        this.containerRef = React.createRef()
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createSVG() {
        this.svg = d3.select(".chart-container")
            .append("svg")
            .attr("height", this.props.svgHeight)
            .attr("width", "100%")
            .append("g")
            .attr("transform", "translate(30,10)")
            .attr("id", "bar-chart");
    }

    createBarChart() {
        const width = this.containerRef.current.offsetWidth;
        if (!this.isRendered) {
            this.createSVG();
            this.isRendered = true;
        }

        const widthYTickValue = 20;
        const widthYAxisLabel = 20;
        // scaling width will be total widht - lenght * inner padding - width of y-axis tick value - width of y-axis label
        const scalingWidth = width - this.props.data.length * (this.props.innerPadding || 0) - widthYTickValue - widthYAxisLabel;

        const heightXTickValue = 30;
        const heightXAxisLabel = 30;
        // scaling height will be total height - height of x-axis tick value- height of x-axis label;
        const scalingHeight = this.props.svgHeight - heightXTickValue - heightXAxisLabel;
        console.log(scalingWidth);
        const dataMax = d3.max(this.props.data.map(model => model.value));
        const names = this.props.data.map(model => model.name);
        const xScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([0, scalingWidth])
            .domain(names);
        console.log(xScale.bandwidth());
        const yScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
            .domain([0, dataMax || 1])
            .range([scalingHeight, 0]);


        let barContainer = this.svg.selectAll(".bar-container").data([1]);
        barContainer = barContainer
            .enter()
            .append("g")
            .attr("class", "bar-container")
            .merge(barContainer)
            .attr("transform", `translate(${widthYAxisLabel + widthYTickValue},0)`)
        /*
        for x axis
         */
        var xAxis = d3.axisBottom(xScale);
        barContainer.select(".x-axis").remove();
        barContainer.append("g")
            .style("font", "14px times")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${scalingHeight})`)
            .call(xAxis);
        /*
        for y axis
        */
        barContainer.select(".y-axis").remove();
        var yAxis = d3.axisLeft(yScale)
            .ticks(this.props.ticks || 5)
        barContainer.append("g")
            .style("font", "14px times")
            .attr("class", "y-axis")
            .call(yAxis);
        /*
        for bars
         */
        const rectBars = barContainer.selectAll(".rect_bar").data(this.props.data);
        rectBars.exit().remove();
        rectBars
            .enter()
            .append("rect")
            .merge(rectBars)
            .attr("class", "rect_bar")
            .attr("transform", "translate(1,0)")
            .style('fill', '#fe9922')
            .attr('x', (d: BarChartModel) => xScale(d.name))
            .attr('y', (d: BarChartModel) => {
                return yScale(d.value)
            })
            .attr('height', (d: BarChartModel) => scalingHeight - yScale(d.value))
            .attr('width', xScale.bandwidth() - (this.props.innerPadding || 0))

        this.drawLabel(this.svg, "x-axis-label", scalingWidth / 2, this.props.svgHeight - heightXAxisLabel / 2 + 5, "", this.props.xAxisLabel);
        this.drawLabel(this.svg, "y-axis-label", -scalingHeight / 2, 0, "rotate(-90)", this.props.yAxisLabel);
    }

    drawLabel(container: any, className: string, x: number, y: number, transform: string, value: string) {
        const text = container.selectAll(`.${className}`).data([1]);
        text.exit().remove();
        text.enter()
            .append("text")
            .attr("class", className)
            .merge(text)
            .attr("x", x)
            .attr("y", y)
            .attr("transform", transform)
            .style("text-anchor", "middle")
            .text(value);
    }


    render() {
        return (<div ref={this.containerRef} className="chart-container"></div>)
    }
}

export default BarChart