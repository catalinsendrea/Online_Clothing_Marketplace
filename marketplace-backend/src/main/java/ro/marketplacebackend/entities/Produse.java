package ro.marketplacebackend.entities;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name= "products")
public class Produse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;


    @Column(name = "imagine", nullable = false, length=10000000)
    @NotBlank
    private String imagine;


    @Column(name = "tip_produs", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String tip_produs;


    @Column(name = "marime", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String marime;


    @Column(name = "culoare", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String culoare;


    @Column(name = "categorie", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String categorie;


    @Column(name = "pret", nullable = false)
    @NotBlank
    @Size(max = 20)
    private float pret;

    @Column(name = "pret_reducere", nullable = false)
    @NotBlank
    @Size(max = 20)
    private float pretReducere;


    @Column(name = "firma", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String firma;


    @Column(name = "titlu", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String titlu;


    @Column(name = "descriere", nullable = false)
    @NotBlank
    @Size(max = 500)
    private String descriere;


    @Column(name = "uzura", nullable = false)
    @NotBlank
    @Size(max = 20)
    private String uzura;


    @Column(name = "numar", nullable = false)
    @NotBlank
    @Size(max = 20)
    private Integer count;


    @Column(name = "reducere", nullable = false)
    @Size(max = 20)
    private Integer reducere;


    @Column(name = "proprietar", nullable = false)
    @NotBlank
    @Size(max = 30)
    private String proprietar;


    @Column(name = "scor", nullable = false)
    @NotBlank
    @Size(max = 20)
    private Integer scor;



    public Produse(){

    }

    public Produse(@NotBlank String imagine, @NotBlank @Size(max = 20) String tip_produs, @NotBlank @Size(max = 20) String marime, @NotBlank @Size(max = 20) String culoare, @NotBlank @Size(max = 20) String categorie, @NotBlank @Size(max = 20) float pret, @NotBlank @Size(max = 20) float pretReducere, @NotBlank @Size(max = 20) String firma, @NotBlank @Size(max = 30) String titlu, @NotBlank @Size(max = 500) String descriere, @NotBlank @Size(max = 20) String uzura, @NotBlank @Size(max = 20) Integer count, @Size(max = 20) Integer reducere, @NotBlank @Size(max = 30) String proprietar, @NotBlank @Size(max = 20) Integer scor) {
        this.imagine = imagine;
        this.tip_produs = tip_produs;
        this.marime = marime;
        this.culoare = culoare;
        this.categorie = categorie;
        this.pret = pret;
        this.pretReducere = pretReducere;
        this.firma = firma;
        this.titlu = titlu;
        this.descriere = descriere;
        this.uzura = uzura;
        this.count = count;
        this.reducere = reducere;
        this.proprietar = proprietar;
        this.scor = scor;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImagine() {
        return imagine;
    }

    public void setImagine(String imagine) {
        this.imagine = imagine;
    }

    public String getTip_produs() {
        return tip_produs;
    }

    public void setTip_produs(String tip_produs) {
        this.tip_produs = tip_produs;
    }

    public String getMarime() {
        return marime;
    }

    public void setMarime(String marime) {
        this.marime = marime;
    }

    public String getCuloare() {
        return culoare;
    }

    public void setCuloare(String culoare) {
        this.culoare = culoare;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public float getPret() {
        return pret;
    }

    public void setPret(float pret) {
        this.pret = pret;
    }

    public String getFirma() {
        return firma;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }

    public String getTitlu() {
        return titlu;
    }

    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getUzura() {
        return uzura;
    }

    public void setUzura(String uzura) {
        this.uzura = uzura;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getReducere() {
        return reducere;
    }

    public void setReducere(Integer reducere) {
        this.reducere = reducere;
    }

    public float getPretReducere() {
        return pretReducere;
    }

    public void setPretReducere(float pretReducere) {
        this.pretReducere = pretReducere;
    }

    public String getProprietar() {
        return proprietar;
    }

    public void setProprietar(String proprietar) {
        this.proprietar = proprietar;
    }

    public Integer getScor() {
        return scor;
    }

    public void setScor(Integer scor) {
        this.scor = scor;
    }
}
