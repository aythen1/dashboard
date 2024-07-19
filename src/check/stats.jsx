import React from 'react'

import styles from './stats.module.css'

import * as Graphs from "@/views/app/pages/DashBoard/graphs/render"


const Stats = () => {

    const componentGraph = [
        "LineScatter",
        "SimpleLineChart",
        "SimpleLineStraightChart",
        "AreaLineChart",
        "BIPolarLineChart",
        "SeriesOverRides",
        "SeriesLine",
        "BIPolarBarChart",
        "OverlappingBars",
        "MultiLineLabels",
        "StackedBarChart",
        "HorizontalBarChart",
        "DistributedSeries",
        "SimplePieChart",
        "GaugeChart",
        "DonutChart",
        "BarChart"
    ]


    return (
        <div>
            <Graphs.LineScatter />
            <Graphs.SimpleLineChart />
            <Graphs.SimpleLineStraightChart />
            <Graphs.AreaLineChart />
            <Graphs.BIPolarLineChart />
            <Graphs.SeriesOverRides />
            <Graphs.SeriesLine />
            <Graphs.BIPolarBarChart />
            <Graphs.OverlappingBars />
            <Graphs.MultiLineLabels />
            <Graphs.StackedBarChart />
            <Graphs.HorizontalBarChart />
            <Graphs.DistributedSeries />
            <Graphs.SimplePieChart />
            <Graphs.GaugeChart />
            <Graphs.DonutChart />
            <Graphs.BarChart />
        </div>
    )
}

export default Stats