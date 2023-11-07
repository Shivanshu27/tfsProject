import express from "express";
import {
  create_player_game_stats,
  get_player_game_stats,
  update_player_game_stats,
  delete_player_game_stats
} from "../controllers/userGameData.js";

const router = express.Router();

router.post("/insertPlayerGameData", create_player_game_stats);
router.get("/getPlayerGameData/:playerId", get_player_game_stats);
router.put("/updatePlayerGameData/:playerId", update_player_game_stats);
router.delete("/deletePlayerGameData/:playerId", delete_player_game_stats);

export default router;