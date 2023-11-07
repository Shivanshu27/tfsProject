
import { ObjectId } from 'mongodb';

export const create_player_game_stats = async (req, res) => {
    let objResponse = {};
    objResponse['status'] = false;
    objResponse['msg'] = "Something Went Wrong!";
    console.log("create_player_game_stats - data " + JSON.stringify(req.body)); // Use req.body to access the incoming data.
  
    try {
      const data = req.body; // Assuming the data is sent in the request body.

      let playerStats = {};

      // You can add your own validation checks for the fields here.

      playerStats.playerName = data.playerName;
      playerStats.gameType = data.gameType;
      playerStats.gamesPlayed = parseInt(data.gamesPlayed);
      playerStats.gamesWon = parseInt(data.gamesWon);
      playerStats.gamesLost = parseInt(data.gamesLost);
      playerStats.score = parseInt(data.score);
      playerStats.createdDate = new Date();

      const playerStatsData = await global.mongodb.collection("playerStats").insertOne(playerStats);
      console.log("playerStatsData:", JSON.stringify(playerStatsData));
  
      if (playerStatsData !== null && typeof(playerStatsData) !== "undefined" && playerStatsData.hasOwnProperty("insertedId")) {
        objResponse['status'] = true;
        objResponse['msg'] = "Player stats recorded successfully!";
      }
  
      return res.json(objResponse);
    } catch (err) {
      console.error("create_player_game_stats: error " + err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  

  export const get_player_game_stats = async (req, res) => {
    try {
      const playerId = req.params.playerId; // Assuming you pass playerId as a route parameter.
      
      const playerStatsData = await global.mongodb.collection("playerStats").findOne({ _id: new ObjectId(playerId) });
  
      if (playerStatsData) {
        return res.json(playerStatsData);
      } else {
        return res.status(404).json({ status: false, msg: "Player stats not found" });
      }
    } catch (err) {
      console.error("get_player_game_stats: error " + err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };

  
  export const update_player_game_stats = async (req, res) => {
    try {
      const playerId = req.params.playerId; // Assuming you pass playerId as a route parameter.
      const data = req.body; // Assuming the data to update is sent in the request body.
  
      // Ensure that only specific fields are updated and have the correct data types.
      const allowedFields = ["playerName", "gameType", "gamesPlayed", "gamesWon", "gamesLost", "score"];
      const updatedData = {};
  
      for (const field of allowedFields) {
        if (field in data) {
          if (field === "gamesPlayed" || field === "gamesWon" || field === "gamesLost" || field === "score") {
            updatedData[field] = parseInt(data[field]);
          } else {
            updatedData[field] = data[field];
          }
        }
      }
  
      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ status: false, msg: "No valid fields to update" });
      }
  
      // Add the "updatedDate" field with the current date.
      updatedData.updatedDate = new Date();
  
      const playerStatsData = await global.mongodb.collection("playerStats").updateOne(
        { _id: new ObjectId(playerId) },
        { $set: updatedData }
      );
  
      if (playerStatsData.matchedCount > 0) {
        return res.json({ status: true, msg: "Player stats updated successfully" });
      } else {
        return res.status(404).json({ status: false, msg: "Player stats not found" });
      }
    } catch (err) {
      console.error("update_player_game_stats: error " + err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };

  
  export const delete_player_game_stats = async (req, res) => {
    try {
      const playerId = req.params.playerId; // Assuming you pass playerId as a route parameter.
  
      const playerStatsData = await global.mongodb.collection("playerStats").deleteOne({ _id: playerId });
  
      if (playerStatsData.deletedCount > 0) {
        return res.json({ status: true, msg: "Player stats deleted successfully" });
      } else {
        return res.status(404).json({ status: false, msg: "Player stats not found" });
      }
    } catch (err) {
      console.error("delete_player_game_stats: error " + err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  