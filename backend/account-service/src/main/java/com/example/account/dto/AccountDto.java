package com.example.account.dto;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {
    private String idUser;
    private String nickname;
    private String phone;
    private Boolean phoneNumberConfirmed;
}
