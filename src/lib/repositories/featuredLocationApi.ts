import { supabase } from '../supabaseClient'
import type { FeaturedLocation } from '../models/featuredLocation'

export async function fetchFeaturedLocations(): Promise<FeaturedLocation[]> {
   const { data, error } = await supabase.from('featured_locations').select('*').order('title')
   if (error) throw error
   return data as FeaturedLocation[]
}

export async function addFeaturedLocation(location: Omit<FeaturedLocation, 'id'>) {
   const { data, error } = await supabase.from('featured_locations').insert([location]).select()
   if (error) throw error
   return data?.[0]
}

export async function updateFeaturedLocation(id: number, location: Partial<Omit<FeaturedLocation, 'id'>>) {
   const { data, error } = await supabase.from('featured_locations').update(location).eq('id', id).select()
   if (error) throw error
   return data?.[0]
}

export async function deleteFeaturedLocation(id: number) {
   const { error } = await supabase.from('featured_locations').delete().eq('id', id)
   if (error) throw error
   return true
} 