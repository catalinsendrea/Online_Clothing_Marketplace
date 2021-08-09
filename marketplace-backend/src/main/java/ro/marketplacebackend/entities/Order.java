package ro.marketplacebackend.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name= "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;


    @Column(name = "id_cumparator", nullable = false)
    @NotBlank
    @Size(max = 20)
    private Integer id_cumparator;


    @Column(name = "email", nullable = false)
    @NotBlank
    @Size(max = 100)
    private String email;


    @Column(name = "livrator", nullable = false)
    @Size(max = 20)
    private String livrator;


    @Column(name = "mentiuni", nullable = false)
    @Size(max = 200)
    private String mentiuni;


    @Column(name = "modalitate_plata", nullable = false)
    @Size(max = 20)
    private String modalitate_plata;


    @Column(name = "suma_plata", nullable = false)
    @Size(max = 20)
    private float suma_plata;


    @Column(name = "id_produse_comandate", nullable = false)
    @Size(max = 30)
    private String id_produse_comandate;


    public Order(@NotBlank @Size(max = 20) Integer id_cumparator, @NotBlank @Size(max = 100) String email, @Size(max = 20) String livrator, @Size(max = 200) String mentiuni, @Size(max = 20) String modalitate_plata, @Size(max = 20) float suma_plata, @Size(max = 30) String id_produse_comandate) {
        this.id_cumparator = id_cumparator;
        this.email = email;
        this.livrator = livrator;
        this.mentiuni = mentiuni;
        this.modalitate_plata = modalitate_plata;
        this.suma_plata = suma_plata;
        this.id_produse_comandate = id_produse_comandate;
    }

    public Order(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_cumparator() {
        return id_cumparator;
    }

    public void setId_cumparator(Integer id_cumparator) {
        this.id_cumparator = id_cumparator;
    }

    public String getLivrator() {
        return livrator;
    }

    public void setLivrator(String livrator) {
        this.livrator = livrator;
    }

    public String getMentiuni() {
        return mentiuni;
    }

    public void setMentiuni(String mentiuni) {
        this.mentiuni = mentiuni;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getModalitate_plata() {
        return modalitate_plata;
    }

    public void setModalitate_plata(String modalitate_plata) {
        this.modalitate_plata = modalitate_plata;
    }

    public float getSuma_plata() {
        return suma_plata;
    }

    public void setSuma_plata(float suma_plata) {
        this.suma_plata = suma_plata;
    }

    public String getId_produse_comandate() {
        return id_produse_comandate;
    }

    public void setId_produse_comandate(String id_produse_comandate) {
        this.id_produse_comandate = id_produse_comandate;
    }
}
