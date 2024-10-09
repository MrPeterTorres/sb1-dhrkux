"use client"

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Slider } from './ui/slider'
import dynamic from 'next/dynamic'

const PoliticalRadarGraph = dynamic(() => import('./PoliticalRadarGraph'), { ssr: false })

const questions = [
  {
    topic: "Economy",
    question: "How should the government address inflation and economic challenges?",
    leftLabel: "More government intervention",
    rightLabel: "Less government intervention"
  },
  {
    topic: "Healthcare",
    question: "What approach should be taken to make healthcare more affordable?",
    leftLabel: "Universal healthcare",
    rightLabel: "Free market healthcare"
  },
  {
    topic: "Immigration",
    question: "How should the U.S. handle immigration policy?",
    leftLabel: "More open borders",
    rightLabel: "Stricter border control"
  },
  {
    topic: "Gun Control",
    question: "What level of gun control should be implemented?",
    leftLabel: "Stricter gun laws",
    rightLabel: "Protect gun ownership rights"
  },
  {
    topic: "Crime",
    question: "How should the government address crime and public safety?",
    leftLabel: "Focus on rehabilitation",
    rightLabel: "Tougher law enforcement"
  },
  {
    topic: "Climate Change",
    question: "How should the U.S. address climate change?",
    leftLabel: "Aggressive climate action",
    rightLabel: "Minimal government intervention"
  },
  {
    topic: "Drug Policy",
    question: "How should the government address drug addiction?",
    leftLabel: "Decriminalization and treatment",
    rightLabel: "Stricter enforcement"
  },
  {
    topic: "Bipartisanship",
    question: "How important is bipartisan cooperation in government?",
    leftLabel: "Prioritize compromise",
    rightLabel: "Stick to party principles"
  },
  {
    topic: "Reproductive Rights",
    question: "What should be the government's stance on reproductive rights?",
    leftLabel: "Pro-choice",
    rightLabel: "Pro-life"
  },
  {
    topic: "Foreign Policy",
    question: "How should the U.S. approach international relations?",
    leftLabel: "More diplomatic engagement",
    rightLabel: "America First policy"
  }
]

export default function PoliticalQuestionnaire() {
  const [results, setResults] = useState(null)
  const { control, handleSubmit } = useForm()

  const onSubmitForm = (data) => {
    const formattedData = Object.keys(data).map(key => ({
      topic: key,
      value: parseFloat(data[key])
    }))
    setResults(formattedData)
  }

  if (results) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Political Stance</h2>
        <PoliticalRadarGraph data={results} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {questions.map((q, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{q.topic}</CardTitle>
            <CardDescription>{q.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name={q.topic}
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="relative py-5">
                    <div className="absolute inset-x-0 h-2 flex items-center justify-between pointer-events-none">
                      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((tick) => (
                        <div key={tick} className="w-0.5 h-2 bg-gray-300"></div>
                      ))}
                    </div>
                    <Slider
                      min={-5}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="z-10"
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{q.leftLabel}</span>
                    <span>{q.rightLabel}</span>
                  </div>
                </div>
              )}
            />
          </CardContent>
        </Card>
      ))}
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </form>
  )
}