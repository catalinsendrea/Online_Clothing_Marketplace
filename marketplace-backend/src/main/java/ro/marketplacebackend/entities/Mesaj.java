package ro.marketplacebackend.entities;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name= "message")
public class Mesaj {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "expeditor", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String expeditor;

    @Column(name = "subiect", nullable = false)
    @Size(max = 20)
    private String subiect;

    @Column(name = "mesaj", nullable = false)
    private String mesaj;

    @Column(name = "destinatar", nullable = false)
    private String destinatar;


    public Mesaj(@NotBlank @Size(max = 30) String expeditor, @Size(max = 20) String subiect, String mesaj, String destinatar) {
        this.expeditor = expeditor;
        this.subiect = subiect;
        this.mesaj = mesaj;
        this.destinatar = destinatar;
    }

    public Mesaj(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubiect() {
        return subiect;
    }

    public void setSubiect(String subiect) {
        this.subiect = subiect;
    }

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }

    public String getExpeditor() {
        return expeditor;
    }

    public void setExpeditor(String expeditor) {
        this.expeditor = expeditor;
    }

    public String getDestinatar() {
        return destinatar;
    }

    public void setDestinatar(String destinatar) {
        this.destinatar = destinatar;
    }
}
