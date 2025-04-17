import React, { useEffect, useState } from 'react';
import { Heading, Container, Box, Text } from "@chakra-ui/react";
import { Article } from '@/services/api';
import { articleService } from '@/services/api';

interface ApiResponse {
  status?: string;
  data?: Article[];
  error?: string;
}

async function fetchData(url: string): Promise<ApiResponse> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { data: data.data, status: data.status };
  } catch (error) {
    return { error: "Error fetching data" };
  }
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      const { data, error } = await fetchData('http://localhost:3000/api/articles');
      if (error) {
        setError(error);
      } else if (data) {
        setArticles(data);
      }
      setIsFetching(false);
    };

    getArticle();
  }, []);

  if (error) {
    return (
      <Container>
        Error: {error}
      </Container>
    );
  }

  return (
    <Container>
      <Heading mb={4}>Artikel</Heading>
      {isFetching && 
         <Container>
         Fetching article data...
       </Container>
      }
      {articles && articles.map((article) => (
        <Box key={article.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{article.title}</Text>
          <Text fontSize="sm">By {article.creator_name}</Text>
          <Text fontSize="sm">Comments: {article.comments_count}</Text>
        </Box>
      ))}
    </Container>
  );
};

export default ArticlePage;
