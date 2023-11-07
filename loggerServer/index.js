import amqp from "amqplib";
import fs from "fs";
import path from "path"; // Import the path module
//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeMessages() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  console.log("entered here")

  await channel.assertExchange("logExchange", "direct");

  const q = await channel.assertQueue("InfoQueue");

  await channel.bindQueue(q.queue, "logExchange", "Info");
//   console.log(channel)

  channel.consume(q.queue, (msg) => {
    console.log("entered here -- ")
    const data = JSON.parse(msg.content);
    console.log(data);
    logEventToFile(data);
    channel.ack(msg);
  });
}

function logEventToFile(data) {
    // Format the data as a string
    const logMessage = `${new Date().toISOString()}: ${JSON.stringify(data)}\n`;
  
    // Get the current directory and specify the file name
  const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
  const logFilePath = path.join(currentDirectory, 'event.log');
  
    // Append the log message to the file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Error writing to the log file:", err);
      } else {
        console.log("Event logged to file:", logMessage);
      }
    });
  }

consumeMessages();