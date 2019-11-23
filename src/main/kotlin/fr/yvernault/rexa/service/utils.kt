package fr.yvernault.rexa.service

import org.json.JSONArray
import org.json.JSONObject

fun jsonFormat(json: String): JSONArray {
    val answer = JSONObject(json)
    return answer.optJSONObject("ResultSet").optJSONArray("Result")
}
