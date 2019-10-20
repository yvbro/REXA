package fr.yvernault.rexa.controller

import fr.yvernault.daxapp.services.scan.impl.ScanServiceImpl
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class FirstApiController {

    @GetMapping("/greeting")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String) = "Hello, $name"

    @GetMapping("/project/{id}")
    fun getProject(@PathVariable id: String){
        val scansProject = ScanServiceImpl.get_project_scans(id)
        if(scansProject==null){
            print("The project : $id doesn't exist")
        }else{
            println("SCANS : $scansProject")
        }
    }
}