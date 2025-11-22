package net.monitoring.api

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class FrontendController {

    @GetMapping("/headline")
    @ResponseBody
    fun getHeadline(): String{
        return "Monitoring Software"
    }

    @GetMapping("/frontend")
    fun index(): String {
        return "index"
    }
}
