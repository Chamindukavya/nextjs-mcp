import { z } from 'zod';
import { createMcpHandler } from '@vercel/mcp-adapter';
import { Content } from 'next/font/google';
 
const handler = createMcpHandler(
  (server) => {
    server.tool(
      'courseRecommonder',   //name of the tool
      'give a course recomendation according to the experiance level and the skills',

      //input schema
      {
        experienceLevel: z.enum(["beginner", "intermediate"]),
      },

      //return schema
      ({experienceLevel}) => ({
        content: [
            {
                type: 'text',
                text: `I recommend you to take the ${experienceLevel === "beginner" ? "Professional java script" : "proffesional python"} course`,
            }
        ]
      })
      
    );
  },
  {
    capabilities: {
      tools: {
        courseRecommonder: {
          description: "give a course recomendation according to the experiance level and the skills",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: '/sse',
    streamableHttpEndpoint: '/mcp',
    verboseLogs: true,
    maxDuration: 60,
  },
);
 
export { handler as GET, handler as POST, handler as DELETE };