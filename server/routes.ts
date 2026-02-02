import type { Express } from "express";
import { createServer, type Server } from "node:http";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  app.get("/api/movies/trending", async (req, res) => {
    try {
      const apiKey = process.env.TMDB_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "TMDB API key not configured" });
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=pt-BR`
      );

      if (!response.ok) {
        throw new Error(`TMDB API responded with status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching from TMDB:", error);
      res.status(500).json({ message: "Failed to fetch movies" });
    }
  });

  app.get("/api/movies/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    try {
      const apiKey = process.env.TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
          query as string
        )}&language=pt-BR`
      );

      if (!response.ok) {
        throw new Error(`TMDB API responded with status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error searching TMDB:", error);
      res.status(500).json({ message: "Failed to search movies" });
    }
  });

  app.get("/api/books/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    try {
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query as string
        )}&key=${apiKey}&maxResults=20&language=pt`
      );

      if (!response.ok) {
        throw new Error(`Google Books API responded with status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error searching Google Books:", error);
      res.status(500).json({ message: "Failed to search books" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
