package com.buscaFarma.buscaFarma.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAi() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de localização de farmacias populares")
                        .version("1.0")
                        .description("API para disciplina de engenharia de software que visa identificar e localizar farmacias populares no Brasil")
                        .contact(new Contact()
                                .name("Douglas")
                                .email("douglas.emiliano@academico.ifpb.edu.br")
                                .url("ifpb.edu.br"))
                        .license(new License()
                                .name("Licença de uso")))
                .servers(Arrays.asList(new Server().url("teste.com.br")))
                .addTagsItem(new io.swagger.v3.oas.models.tags.Tag().name("Farmacias").description("Operações relacionadas às Farmacias"))
                .addTagsItem(new io.swagger.v3.oas.models.tags.Tag().name("Avaliacao").description("Operações relacionadas às Avaliações"))
                .addSecurityItem(new SecurityRequirement());
    }
}
