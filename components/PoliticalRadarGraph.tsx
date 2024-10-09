"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

export default function PoliticalRadarGraph({ data }) {
  const formattedData = data.map(item => ({
    topic: item.topic,
    value: item.value + 5 // Adjust the value to be between 0 and 10
  }))

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="topic" />
        <Radar name="Political Stance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}