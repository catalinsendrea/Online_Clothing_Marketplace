package ro.marketplacebackend.dtos;


public class ProduseDTO{

    private Integer id;
    private String imagine;
    private String tip_produs;
    private String marime;
    private String culoare;
    private String categorie;
    private float pret;
    private String firma;
    private String titlu;
    private String descriere;
    private String uzura;
    private Integer count;
    private Integer reducere;
    private float pretReducere;
    private String proprietar;
    private Integer scor;

    public ProduseDTO(Integer id, String imagine, String tip_produs, String marime, String culoare, String categorie, float pret, float pretReducere, String firma, String titlu, String descriere, String uzura, Integer count, Integer reducere, String proprietar, Integer scor) {
        this.id = id;
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

    public ProduseDTO(){

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
