import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

// Define the type for the repository
interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const GitHubRepositories: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the repositories from GitHub API
    fetch('https://api.github.com/users/BruryaZ/repos')
      .then(response => response.json())
      .then(data => {
        setRepositories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Render each repository item
  const renderItem = ({ item }: { item: Repository }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.link}>{item.html_url}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repositories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  link: {
    fontSize: 14,
    color: 'blue',
  },
});

export default GitHubRepositories;