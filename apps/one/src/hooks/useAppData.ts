'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Topic, HistoryEntry, CalendarEvent, AppSettings, PromptTemplate, Campaign } from '@/types'

// MOCK DATA FOR DESIGN MODE
const MOCK_TOPICS: Topic[] = [
  { id: '1', title: 'Tendencias IA 2026', niche: 'Tecnología', audience: 'Developers', status: 'ready', createdAt: new Date().toISOString() },
  { id: '2', title: 'Productividad con Agentes', niche: 'Business', audience: 'Founders', status: 'draft', createdAt: new Date().toISOString() },
]

const MOCK_HISTORY: HistoryEntry[] = [
  { id: '1', title: 'Post: El futuro de SDD', type: 'linkedin-post', status: 'published', createdAt: new Date().toISOString() },
]

export function useAppData() {
  const [topics,     setTopics]     = useState<Topic[]>(MOCK_TOPICS)
  const [history,    setHistory]    = useState<HistoryEntry[]>(MOCK_HISTORY)
  const [calendar,   setCalendar]   = useState<CalendarEvent[]>([])
  const [settings,   setSettingsState] = useState<AppSettings>({ apiKey: 'sk-mock...', niche: 'SaaS', audience: 'Builders' })
  const [templates,  setTemplates]  = useState<PromptTemplate[]>([])
  const [campaigns,  setCampaigns]  = useState<Campaign[]>([])
  const [loading,    setLoading]    = useState(false) // Ready instantly in design mode
  
  const [substackConnected,    setSubstackConnected]    = useState(true)
  const [substackPublication,  setSubstackPublication]  = useState('builder-nexus')
  const [editorPrefill,        setEditorPrefill]        = useState<any>(null)

  useEffect(() => {
    // MODO DISEÑO: No fetch
    setLoading(false)
  }, [])

  // Mock functions that only update local state
  const addTopic    = useCallback(async (t: Topic)   => { setTopics(p => [t, ...p]) }, [])
  const updateTopic = useCallback(async (t: Topic)   => { setTopics(p => p.map(x => x.id === t.id ? t : x)) }, [])
  const deleteTopic = useCallback(async (id: string) => { setTopics(p => p.filter(x => x.id !== id)) }, [])

  const addHistory    = useCallback(async (e: HistoryEntry) => { setHistory(p => [e, ...p]) }, [])
  const deleteHistory = useCallback(async (id: string)      => { setHistory(p => p.filter(x => x.id !== id)) }, [])

  const addCalEvent    = useCallback(async (e: CalendarEvent) => { setCalendar(p => [...p, e]) }, [])
  const updateCalEvent = useCallback(async (e: CalendarEvent) => { setCalendar(p => p.map(x => x.id === e.id ? e : x)) }, [])
  const deleteCalEvent = useCallback(async (id: string)       => { setCalendar(p => p.filter(x => x.id !== id)) }, [])

  const saveSettings = useCallback(async (s: AppSettings) => { setSettingsState(s) }, [])

  const addTemplate    = useCallback(async (t: PromptTemplate) => { setTemplates(p => [...p, t]) }, [])
  const updateTemplate = useCallback(async (t: PromptTemplate) => { setTemplates(p => p.map(x => x.id === t.id ? t : x)) }, [])
  const deleteTemplate = useCallback(async (id: string)        => { setTemplates(p => p.filter(x => x.id !== id)) }, [])

  const addCampaign    = useCallback(async (c: Campaign) => { setCampaigns(p => [...p, c]) }, [])
  const updateCampaign = useCallback(async (c: Campaign) => { setCampaigns(p => p.map(x => x.id === c.id ? c : x)) }, [])
  const deleteCampaign = useCallback(async (id: string)  => { setCampaigns(p => p.filter(x => x.id !== id)) }, [])

  const reloadSubstackProfile = useCallback(async () => {}, [])

  return {
    topics, history, calendar, settings, templates, campaigns, loading,
    substackConnected, substackPublication, reloadSubstackProfile,
    editorPrefill, setEditorPrefill,
    addTopic, updateTopic, deleteTopic,
    addHistory, deleteHistory,
    addCalEvent, updateCalEvent, deleteCalEvent,
    saveSettings,
    addTemplate, updateTemplate, deleteTemplate,
    addCampaign, updateCampaign, deleteCampaign,
  }
}
