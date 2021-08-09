package ro.marketplacebackend.entities;

import javax.validation.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;


    @Column(name = "username", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String username;


    @Column(name = "parola", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String password;


    @Column(name = "nume", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String nume;


    @Column(name = "prenume", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String prenume;


    @Column(name = "telefon", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String telefon;

    @Column(name = "email", nullable = false)
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;


    @Column(name = "sex", nullable = false)
    @NotBlank
    @Size(max = 10)
    private String sex;


    @Column(name = "adresa", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String adresa;


    @Column(name = "codpostal", nullable = false)
    @NotBlank
    @Size(max = 10)
    private String codpostal;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User() {
    }

    public User(String username, String email, String password, String nume, String prenume, String telefon, String sex, String adresa, String codpostal) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nume = nume;
        this.prenume = prenume;
        this.telefon = telefon;
        this.sex = sex;
        this.adresa = adresa;
        this.codpostal = codpostal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getCodpostal() {
        return codpostal;
    }

    public void setCodpostal(String codpostal) {
        this.codpostal = codpostal;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}

