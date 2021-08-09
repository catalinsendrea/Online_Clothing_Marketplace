package ro.marketplacebackend.dtos;

public class OrderDTO {

    private Integer id;
    private Integer id_cumparator;
    private String email;
    private String livrator;
    private String mentiuni;
    private String modalitate_plata;
    private float suma_plata;
    private String id_produse_comandate;


    public OrderDTO(Integer id, Integer id_cumparator, String email, String livrator, String mentiuni, String modalitate_plata, float suma_plata, String id_produse_comandate) {
        this.id = id;
        this.id_cumparator = id_cumparator;
        this.email = email;
        this.livrator = livrator;
        this.mentiuni = mentiuni;
        this.modalitate_plata = modalitate_plata;
        this.suma_plata = suma_plata;
        this.id_produse_comandate = id_produse_comandate;
    }

    public OrderDTO(){

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
