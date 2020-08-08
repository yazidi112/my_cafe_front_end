import React from 'react';

class print extends React.Component{
    render (){
        return <div className="bg-white p-3 text-center d-none d-print-block" style={{width:'600px',fontSize:'35px'}}>
                    <div dangerouslySetInnerHTML={{__html: this.props.settings.printhead}} />
                    <div className="row">
                        <div className="col">
                            Commande N° {this.props.commande.id && this.props.commande.id}
                        </div>
                        <div className="col">
                            Serveur: {this.props.user && this.props.user.nom} {this.props.user && this.props.user.prenom}
                        </div>
                    </div> 
                    <table className="table tablebordered">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.commande.lignes.map((commande,index) => 
                                
                                <tr key={index}>
                                    <td>{commande.article.intitule}</td>
                                    <td>{commande.prix}</td>
                                    <td>
                                        <span className="p-2">{commande.quantite}</span>
                                    </td>
                                    <td>{commande.montant}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot  > 
                            <tr>
                                <th>TOTAL</th>
                                <th colSpan="4" className="text-right">
                                { this.props.commande.total }
                                </th>
                            </tr>
                        </tfoot>
                        
                    </table>
                    <p>
                    {this.props.commande.date && this.props.commande.date.split("T")[0]} - 
                    {this.props.commande.date && this.props.commande.date.split("T")[1]}   
                    </p>
                    
                    <div dangerouslySetInnerHTML={{__html: this.props.settings.printfoot}} />
        </div>
    }
}

export default print;