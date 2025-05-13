import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { newsItems, programItems } from '@/constants/MockData';
import NewsCard from '@/components/ui/NewsCard';
import ProgramCard from '@/components/ui/ProgramCard';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function HomeScreen() {
  const router = useRouter();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get upcoming program items (today and future dates)
  const upcomingProgram = programItems
    .filter(item => item.date >= today)
    .slice(0, 3);
  
  // Find the featured/highlighted news item, if any
  const featuredNews = newsItems.find(news => news.isHighlighted);
  // Get the latest regular news items
  const latestNews = newsItems
    .filter(news => !news.isHighlighted)
    .slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Featured News */}
        {featuredNews && (
          <TouchableOpacity 
            style={styles.featuredContainer}
            onPress={() => router.push(`/news/${featuredNews.id}`)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: featuredNews.imageUrl }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Featured</Text>
              </View>
              <Text style={styles.featuredTitle}>{featuredNews.title}</Text>
              <Text style={styles.featuredDate}>
                {new Date(featuredNews.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Latest News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          {latestNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
          <Button 
            title="View All News" 
            onPress={() => router.push('/news')}
            variant="outline"
            style={styles.viewAllButton}
          />
        </View>

        {/* Upcoming Program */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Program</Text>
          {upcomingProgram.map(item => (
            <ProgramCard key={item.id} item={item} />
          ))}
          <Button 
            title="View Full Program" 
            onPress={() => router.push('/program')}
            variant="outline"
            style={styles.viewAllButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    padding: Layout.spacing.m,
  },
  featuredContainer: {
    height: 300,
    borderRadius: Layout.radius.medium,
    overflow: 'hidden',
    marginBottom: Layout.spacing.l,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.m,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  featuredBadge: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.radius.small,
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.s,
  },
  featuredBadgeText: {
    color: Colors.white,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
  featuredTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: Layout.spacing.xs,
  },
  featuredDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.neutral[200],
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: Colors.primary[700],
    marginBottom: Layout.spacing.m,
  },
  viewAllButton: {
    marginTop: Layout.spacing.m,
  },
});